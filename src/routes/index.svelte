<script lang="ts" context="module">
	export async function load({ fetch }) {
		let mapSvg, mapJson, storiesJson;

		await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map.svg`)
			.then((res) => res.text())
			.then((data) => {
				// console.log('svg loaded');
				mapSvg = data;
			})
			.catch((error) => console.log(error));

		await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/maps.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log('json loaded');
				mapJson = data;
			})
			.catch((error) => console.log(error));

		await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/stories.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log('json loaded');
				storiesJson = data.stories;
			})
			.catch((error) => console.log(error));

		return {
			props: {
				mapSVG: mapSvg,
				mapData: mapJson,
				storiesData: storiesJson
			}
		};
	}
</script>

<script lang="ts">
	import Left from '$lib/Left.svelte';
	import Right from '$lib/Right.svelte';
	import Manipulator from '$lib/Manipulator.svelte';
	import Map from '$lib/Map.svelte';
  import { playback, stories, year, yearLimits } from "../stores";
  import { onDestroy } from "svelte";

  const enum PlaybackMode {
    Pause,
    Forward,
    Backward,
    FastForward,
    FastBackward
  }


  export let mapSVG;
	export let mapData: {
		map: [];
		dates: [number];
		limits: {
			min: number;
			max: number;
		};
	} = {};
	export let storiesData = [];

	$stories = storiesData;

	$yearLimits.min = mapData.limits.min;
	$yearLimits.max = mapData.limits.max;
	$year = mapData.limits.min;

  async function runPlayback() {
    if ($playback == 1) {
      let next = $year + .25;
      // console.log(next);
      if ($year < $yearLimits.max) {
        year.update(n => n = next, {duration: 0})
        requestAnimationFrame(runPlayback)
      }
      else $playback = 0
    } else if ($playback == 2) {
      let next = $year - .25;
      // console.log(next);
      if ($year > $yearLimits.min) {
        year.update(n => n = next, {duration: 0})
        requestAnimationFrame(runPlayback)
      }
      else $playback = 0
    }
  }

  const unsubPlayback = playback.subscribe(x => {
    if(x) {
      console.log("started playback");
      requestAnimationFrame(runPlayback)
    }
  })

  onDestroy(() => unsubPlayback())
</script>

<svelte:head>
	<title>Wassererbe Augsburg</title>
</svelte:head>

<Left />
<Map {mapSVG} {mapData} />
<Right />
<Manipulator />
