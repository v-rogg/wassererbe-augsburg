<script lang="ts" context="module">
  export async function load({ fetch }) {
    let mapSvg, mapJson, storiesJson;

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map-ordered.svg`)
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
        loadedMapData: mapJson,
        storiesData: storiesJson
      }
    };
  }
</script>

<script lang="ts">
  import Layout from "$lib/_Layout.svelte";
  import Map from "$lib/Components/Map.svelte";
  import { mapData, playback, stories, year, yearChanges, yearLimits, isMobile } from "../stores";
  import { onDestroy } from "svelte";
  import { PlaybackMode } from "$lib/enums";
  import Timeline from "$lib/Components/Timeline.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import Controls from "$lib/Components/Controls.svelte";
  import Legal from "$lib/Components/Legal.svelte";
  import About from "$lib/Components/About.svelte";
  import StorySelector from "$lib/Components/StorySelector.svelte";
  import RightSide from "$lib/RightSide.svelte";

  export let mapSVG;
  export let loadedMapData: {
    map: undefined;
    dates: [number];
    limits: {
      min: number;
      max: number;
    };
  } = {};
  export let storiesData = [];

  mapData.set(loadedMapData);

  $stories = storiesData;

  $yearLimits.min = loadedMapData.limits.min;
  $yearLimits.max = loadedMapData.limits.max;
  $year = loadedMapData.limits.min;
  $yearChanges = loadedMapData.dates;

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
      console.log("started playback");
      requestAnimationFrame(runPlayback);
    }
  });

  let innerHeight;
  let innerWidth;

  onDestroy(() => unsubPlayback());
</script>

<svelte:head>
  <title>Wassererbe Augsburg</title>
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />
{innerWidth} {innerHeight}

<Layout>
  <Map {mapSVG} slot="center" />
  <Brand slot="top_left" />
  <Timeline slot="bottom_mid" />
  <Controls slot="top_mid" />
  <Legal slot="bottom_right" />
  <About slot="bottom_left" />
  <StorySelector slot="mid_left" />
  <RightSide slot="mid_right" />
</Layout>
