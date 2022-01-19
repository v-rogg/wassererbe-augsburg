import { defaultYearChangeDuration, yearLimits, year, playback } from "../../stores";
import { PlaybackMode } from "$lib/enums";
import { get } from "svelte/store";

export function _(query: string): HTMLElement {
  return document.querySelector(query);
}

function run(goToYear) {
  const duration =
    (Math.abs(get(year) - goToYear) / (get(yearLimits).max - get(yearLimits).min)) *
    defaultYearChangeDuration;
  year.update((n) => (n = goToYear), { duration });
  setTimeout(() => {
    playback.set(PlaybackMode.Pause);
  }, duration);

  return true;
}


export function goto(goToYear: number): boolean {
  if (goToYear > get(year)) {
    playback.set(PlaybackMode.FastForward);
    run(goToYear);
  } else if (goToYear < get(year)) {
    playback.set(PlaybackMode.FastBackward);
    run(goToYear);
  }

  return false;
}


export function gotoElement(elem: HTMLElement): boolean {
  const goToYear = parseInt(elem.dataset.year)
  console.log(goToYear);

  if (goToYear > get(year)) {
    playback.set(PlaybackMode.FastForward);
    run(goToYear);
  } else if (goToYear < get(year)) {
    playback.set(PlaybackMode.FastBackward);
    run(goToYear);
  }

  return false;
}
