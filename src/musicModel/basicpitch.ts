import {
  BasicPitch,
  noteFramesToTime,
  addPitchBendsToNoteEvents,
  outputToNotesPoly,
  type NoteEventTime,
} from "@spotify/basic-pitch";
import { Midi } from "@tonejs/midi";
import getWeb from "./midiConvert";
import { on } from "events";

/**
 * Inputs source of audio file and returns a pdf file
 * @param src 
 * @returns 
 */
const getSheetMusic = async (src: File, difficulty:number, onsetThresh:number, offsetThresh:number, minNoteLength:number): Promise<File> => {
  console.log(`Source: ${src.name}, Difficulty: ${difficulty}, Onset Threshold: ${onsetThresh}, Offset Threshold: ${offsetThresh}, Min Note Length: ${minNoteLength}`);

  if (onsetThresh === 0 || offsetThresh === 0 || minNoteLength === 0) {
  switch(difficulty){
    case 1:
      onsetThresh = 2;
      offsetThresh = .8;
      minNoteLength = 5;
      break;
    case 2:
      onsetThresh = 1.5;
      offsetThresh = 0.8;
      minNoteLength = 5;
      break;
    case 3:
      onsetThresh = 1;
      offsetThresh = 0.5;
      minNoteLength = 5;
      break;
    case 4:
      onsetThresh = .8;
      offsetThresh = 0.3;
      minNoteLength = 5;
      break;
    case 5:
      onsetThresh = .7;
      offsetThresh = 0.1;
      minNoteLength = 4;
      break;
    default:
      onsetThresh = .5;
      offsetThresh = .1;
      minNoteLength = 3;
      break;
  }
} else {

}

console.log(`Source: ${src.name}, Difficulty: ${difficulty}, Onset Threshold: ${onsetThresh}, Offset Threshold: ${offsetThresh}, Min Note Length: ${minNoteLength}`);
  // Creates an audio context
  const audioCtx = new AudioContext({
    sampleRate: 22050,
  });

  // Fetches the audio file and decodes it
  const buffer = await new Promise<AudioBuffer>(async (res, rej) => {
    audioCtx.decodeAudioData(await src.arrayBuffer(), res, rej);
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
    () => { }
  );
  // Convert the note frames to time
  /**
   * onsets: An onset activation matrix identifies the specific points in time when new notes begin. 
   * Each value in the matrix indicates the likelihood of a note starting at that time and frequency. 
   * Detecting onsets accurately is vital for correctly identifying the start of notes.

  onsetThresh: This threshold sets the minimum amplitude of an onset activation that must be reached to consider 
  it an actual onset of a note. This helps in filtering out false positives and ensuring that only significant 
  note beginnings are recognized.

  frameThresh: This threshold is used to determine whether a note should continue. 
  If the amplitude of a frame activation drops below this level, 
  it indicates that the note has ended or is too soft to be considered as continuing.

  minNoteLen: This defines the minimum length a note must have to be recognized. 
  This is measured in frames, not time directly, 
  helping to prevent the recognition of very short, possibly erroneous notes.

  inferOnsets: When this setting is true, the algorithm will automatically add onsets if there are 
  large differences in frame amplitudes, suggesting a significant change in the audio that 
  likely corresponds to a new note starting.

  maxFreq and minFreq: These settings define the frequency range within 
  which notes can be recognized. Frequencies outside this range will be 
  ignored, which can be useful for filtering out noise or other unwanted audio components.

  melodiaTrick: This involves a specific enhancement where semitones 
  near a peak in frequency data are removed, presumably to clean up the data and avoid misinterpretation of 
  pitches that are close to actual note peaks.

  energyTolerance: This parameter allows a certain number of frames to drop 
  below the threshold (potentially zero amplitude) without terminating the note. This can help in maintaining the 
  continuity of notes through brief drops in sound level.
   */
  // simple songs 2 .8 5
  // moderate songs .5 .3 5
  const notes = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, onsetThresh, offsetThresh, minNoteLength, true),
    )
  );
  console.log(notes);

  // Convert the notes array to base64
  const base64 = await convertMidiFile(notes);

  console.log(base64);

  // Convert the base64 to a file
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(new Blob([base64], { type: "audio/midi" }));
  // link.download = "output.mid";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

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


