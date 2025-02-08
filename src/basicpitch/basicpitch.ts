'use client';
import {
  BasicPitch,
  noteFramesToTime,
  addPitchBendsToNoteEvents,
  outputToNotesPoly,
  type NoteEventTime,
} from "@spotify/basic-pitch";
import { Midi } from "@tonejs/midi";

const getMidi = async () => {
  const audioCtx = new AudioContext({
    sampleRate: 22050,
  });

  const src =
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/fvyaeh7pfuhpaps/store/wow.mp3";


  const buffer = await new Promise<AudioBuffer>(async (res, rej) => {
    audioCtx.decodeAudioData(await (await fetch(src)).arrayBuffer(), res, rej);
  });

  const mono = buffer.getChannelData(0);

  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];

  const model = "https://unpkg.com/@spotify/basic-pitch@1.0.1/model/model.json";
  const basicPitch = new BasicPitch(model);
  await basicPitch.evaluateModel(
    mono,
    (f, o, c) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    () => {}
  );

  const json = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, 0.2, 0.2, 5, true)
    )
  );

  const base64 = await convertMidiFile(json);
  return base64;  
};

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

export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      res(event.target?.result as string);
    };
    reader.readAsDataURL(blob);
  });
};

export default function getTheMidi() {
  return getMidi();
}