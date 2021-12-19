<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({fetch}) => {
    let mapSvg, mapJson, storiesJson;

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map.svg`)
      .then((res) => res.text())
      .then((data) => {
        console.log('svg loaded');
        mapSvg = data;
      })
      .catch((error) => console.log(error));

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/maps.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('json loaded');
        mapJson = data;
      })
      .catch((error) => console.log(error));

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/stories.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('json loaded');
        storiesJson = data.stories;
      })
      .catch((error) => console.log(error));

    return {
      props: {
        mapSVG: mapSvg,
        mapData: mapJson,
        storiesData: storiesJson
      }
    }
  }
</script>

<script lang="ts">
	import Left from '$lib/Left.svelte';
	import Right from '$lib/Right.svelte';
	import Manipulator from '$lib/Manipulator.svelte';
  import Map from "$lib/Map.svelte";
  import { stories, year, yearLimits } from "../stores";

  export let mapSVG;
  export let mapData: {
    map: [],
    dates: [number],
    limits: {
      min: number,
      max: number
    }
  } = {};
  export let storiesData = [];

  $stories = storiesData;

  $yearLimits.min = mapData.limits.min;
  $yearLimits.max = mapData.limits.max;
  $year = mapData.limits.min;
</script>

<svelte:head>
	<title>Wassererbe Augsburg</title>
</svelte:head>

<Left />
<Map {mapSVG} {mapData} />
<Right />
<Manipulator />
