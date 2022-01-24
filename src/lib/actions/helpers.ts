import { defaultYearChangeDuration, yearLimits, year, playback, yearChanges } from "../../stores";
import { PlaybackMode } from "$lib/enums";
import { get } from "svelte/store";

export function _(query: string): HTMLElement | SVGPathElement {
  return document.querySelector(query);
}

function run(goToYear) {
  const duration = (Math.abs(get(year) - goToYear) / (get(yearLimits).max - get(yearLimits).min)) * defaultYearChangeDuration;
  year.update((n) => (n = goToYear), { duration });
  setTimeout(() => {
    playback.set(PlaybackMode.Pause);
  }, duration);

  return true;
}

export function goto(goToYear: number, step = false): boolean {
  if (goToYear > get(year)) {
    if (step) {
      playback.set(PlaybackMode.StepForward);
    } else {
      playback.set(PlaybackMode.FastForward);
    }
    run(goToYear);
  } else if (goToYear < get(year)) {
    if (step) {
      playback.set(PlaybackMode.StepBackward);
    } else {
      playback.set(PlaybackMode.FastBackward);
    }
    run(goToYear);
  }

  return false;
}

export function gotoElement(elem: HTMLElement): boolean {
  const goToYear = parseInt(elem.dataset.year);
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

export function findNextSmallerYear(offset = 0): number {
  let num = get(yearLimits).min;
  const sortedYears = get(yearChanges);
  sortedYears.sort((a, b) => {
    return b - a;
  });
  sortedYears.forEach((y) => {
    if (y <= get(year) - offset && y > num) {
      num = y;
    }
  });
  return num;
}

export function findNextBiggerYear(offset = 0): number {
  let num = get(yearLimits).max;
  const sortedYears = get(yearChanges);
  sortedYears.sort((a, b) => a - b);
  sortedYears.forEach((y) => {
    if (y >= get(year) + offset && y < num) {
      num = y;
    }
  });
  return num;
}
