import { defaultYearChangeDuration, yearLimits, year, playback } from "../../stores";
import { PlaybackMode } from "$lib/enums";
import { get } from "svelte/store";

export function _(query: string): HTMLElement {
  return document.querySelector(query);
}

export function goto(goToYear: number): boolean {
  function run() {
    const duration = (Math.abs(get(year) - goToYear) / (get(yearLimits).max - get(yearLimits).min)) * defaultYearChangeDuration;
    year.update((n) => (n = goToYear), { duration });
    setTimeout(() => {
      playback.set(PlaybackMode.Pause);
    }, duration);

    return true;
  }

  if (goToYear > get(year)) {
    playback.set(PlaybackMode.FastForward);
    run();
  } else if (goToYear < get(year)) {
    playback.set(PlaybackMode.FastBackward);
    run();
  }

  return false;
}
