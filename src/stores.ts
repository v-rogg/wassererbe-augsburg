import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { PlaybackMode, StoryDirection } from '$lib/enums';

export const year = tweened(1834, { duration: 1600 });
export const yearLimits = writable({ min: 1600, max: 2021 });
export const yearChanges = writable([]);
export const stories = writable([]);
export const selectedStory = writable(-1);
export const selectedEoI = writable(-1);
export const playback = writable(PlaybackMode.Pause);
export const storyDirection = writable(StoryDirection.Up);
