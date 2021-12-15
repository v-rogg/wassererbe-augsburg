<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({fetch}) => {
    let svg, json;

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map.svg`)
      .then((res) => res.text())
      .then((data) => {
        console.log('svg loaded');
        svg = data;
      })
      .catch((error) => console.log(error));

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/maps.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('json loaded');
        json = data;
      })
      .catch((error) => console.log(error));

    return {
      props: {
        mapSVG: svg,
        mapData: json,
      }
    }
  }

</script>

<script lang="ts">
	import Left from '$lib/Left.svelte';
	import Right from '$lib/Right.svelte';
	import Manipulator from '$lib/Manipulator.svelte';
  import Map from "$lib/Map.svelte";

  export let mapSVG, mapData;
</script>

<svelte:head>
	<title>Wassererbe Augsburg</title>
</svelte:head>

<Left />
<Map {mapSVG} {mapData} />
<Right />
<Manipulator />
