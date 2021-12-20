import { writable } from 'svelte/store';
import { tweened } from "svelte/motion";

enum PlaybackMode {
  Pause,
  Forward,
  Backward,
  FastForward,
  FastBackward
}

export const year = tweened(1650, {duration: 1600});
export const yearLimits = writable({ min: 1600, max: 2021 });
export const stories = writable([]);
export const selectedStory = writable(-1);
export const selectedEoI = writable(-1);
export const playback = writable(0);
