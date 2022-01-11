<script lang="ts" context="module">
	export async function load({ fetch }) {
		let mapSvg, mapJson, storiesJson;

		await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map_neo.svg`)
			.then((res) => res.text())
			.then((data) => {
				// console.log('svg loaded');
				mapSvg = data;
			})
			.catch((error) => console.log(error));

		await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/maps-min.json`)
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
	import { playback, stories, year, yearChanges, yearLimits } from '../stores';
	import { onDestroy } from 'svelte';
	import { PlaybackMode } from '$lib/enums';

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
	$yearChanges = mapData.dates;

	async function runPlayback() {
		if ($playback === PlaybackMode.Forward) {
			let next = $year + 0.25;
			if ($year < $yearLimits.max) {
				year.update((n) => (n = next), { duration: 0 });
				requestAnimationFrame(runPlayback);
			} else $playback = PlaybackMode.Pause;
		} else if ($playback === PlaybackMode.Backward) {
			let next = $year - 0.25;
			if ($year > $yearLimits.min) {
				year.update((n) => (n = next), { duration: 0 });
				requestAnimationFrame(runPlayback);
			} else $playback = PlaybackMode.Pause;
		}
	}

	const unsubPlayback = playback.subscribe((x) => {
		if (x === PlaybackMode.Forward || x === PlaybackMode.Backward) {
			console.log('started playback');
			requestAnimationFrame(runPlayback);
		}
	});

	onDestroy(() => unsubPlayback());
</script>

<svelte:head>
	<title>Wassererbe Augsburg</title>
</svelte:head>


<div class="container">
  <div class="app">
    <img class="ratio" src="ratio.png" alt="resize" aria-hidden="true">
    <div class="center abs">
      <Map {mapSVG} {mapData} />
    </div>
    <div class="top abs">Controls</div>
    <div class="top-left abs">Branding</div>
    <div class="left abs">StorySelector</div>
    <div class="right abs">Info</div>
    <div class="bottom abs">Timeline</div>
    <div class="bottom-left abs">About</div>
    <div class="bottom-right abs">Legal</div>
  </div>
</div>

<style lang="sass">
  .container
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  .app
    position: relative
    width: max-content
    height: max-content
    top: -5px

  .ratio
    display: block
    max-height: calc(100vh - 130px - 4rem)
    max-width: calc(100vw - 460px - 4rem)
    margin: auto
    //width: 100%
    height: max-content
    width: auto

  .abs
    position: absolute

  .top
    top: -60px
    height: 60px
    width: 100%
    background: #18A0FB

  .top-left
    top: -60px
    left: -230px
    width: 230px
    height: 60px
    background: #FF0000

  .bottom
    bottom: -70px
    height: 70px
    width: 100%
    background: #18A0FB

  .bottom-left
    bottom: -70px
    left: -230px
    width: 230px
    height: 70px
    background: #FF0000

  .bottom-right
    bottom: -70px
    right: -230px
    width: 230px
    height: 70px
    background: #FF0000

  .left
    top: 0
    left: -230px
    height: 100%
    width: 230px
    background: #93C700

  .right
    top: 0
    right: -230px
    height: 100%
    width: 230px
    background: #93C700

  .center
    top: 0
    left: 0
    width: 100%
    height: 100%

</style>
