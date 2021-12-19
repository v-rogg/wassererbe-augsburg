import { writable } from "svelte/store";

export const year = writable(1600);
export const yearLimits = writable({"min": 1600, "max": 2021});
export const stories = writable([]);
export const selectedStory = writable(-1);
export const selectedEoI = writable(-1);
