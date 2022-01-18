import { readable, writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { DisplayMode, PlaybackMode, StoryDirection } from "$lib/enums";
import { browser } from "$app/env";

export const year = tweened(1890, { duration: 1600 });
export const yearLimits = writable({ min: 1600, max: 2021 });
export const yearChanges = writable([]);
export const stories = writable([]);
export const selectedStory = writable(-1);
export const selectedEoI = writable(-1);
export const playback = writable(PlaybackMode.Pause);
export const storyDirection = writable(StoryDirection.Up);

export const isMobile = readable(false, (set) => {
  if (browser) {
    set(window.matchMedia("only screen and (max-width: 760px)").matches);
  }
});

export const showTooltip = readable(true);

export const mode = writable(DisplayMode.Map);

export const defaultYearChangeDuration = 2500;

export const mapData = writable({
  map: undefined,
  dates: [0],
  limits: {
    min: 0,
    max: 0
  }
});
