import {
  BasicPitch,
  noteFramesToTime,
  addPitchBendsToNoteEvents,
  outputToNotesPoly,
  type NoteEventTime,
} from "@spotify/basic-pitch";
import { Midi } from "@tonejs/midi";
import getWeb from "./midiConvert";

/**
 * Inputs source of audio file and returns a pdf file
 * @param src 
 * @returns 
 */
const getSheetMusic = async (src:string):Promise<File> => {
  // Creates an audio context
  const audioCtx = new AudioContext({
    sampleRate: 22050,
  });

  // Fetches the audio file and decodes it
  const buffer = await new Promise<AudioBuffer>(async (res, rej) => {
    audioCtx.decodeAudioData(await (await fetch(src)).arrayBuffer(), res, rej);
  });

  const mono = buffer.getChannelData(0);

  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];

  // Obtain TF model from basic-pitch
  const model = "https://unpkg.com/@spotify/basic-pitch@1.0.1/model/model.json";
  const basicPitch = new BasicPitch(model);
  // Evaluate the model
  await basicPitch.evaluateModel(
    mono,
    (f, o, c) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    () => {}
  );
  
  // Convert the note frames to time
  const notes = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, 0.2, 0.2, 5, true)
    )
  );
  
  // Convert the notes array to base64
  const base64 = await convertMidiFile(notes);

  // Convert the base64 to a file
  const file = midiFile(base64);

  return getWeb(file);
};

/**
 * takes in a NoteEventTime array and returns a base64 string
 * @param notes 
 * @returns 
 */
const convertMidiFile = (notes: NoteEventTime[]) => {
  const midi = new Midi();
  const track = midi.addTrack();
  notes.forEach((note) => {
    track.addNote({
      midi: note.pitchMidi,
      time: note.startTimeSeconds,
      duration: note.durationSeconds,
      velocity: note.amplitude,
    });
  });
  
  const base64 = blobToBase64(
    new Blob([midi.toArray()], { type: "audio/midi" })
  );
  return base64;
};

/**
 * Takes in a blob and returns a base64 string
 * @param blob 
 * @returns 
 */
export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      res(event.target?.result as string);
    };
    reader.readAsDataURL(blob);
  });
};

/**
 * Takes in a base64 string and returns a file
 * @param base64 
 * @returns 
 */
function midiFile(base64: string): File {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: 'audio/midi' });
  return new File([blob], 'output.mid', { type: 'audio/midi' });
}

export default getSheetMusic;


