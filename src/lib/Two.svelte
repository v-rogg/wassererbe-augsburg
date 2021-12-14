<script lang="ts">
	import Two from 'two.js';
	import { onMount } from 'svelte';
	import { loadAssets } from '$lib/actions/loadAssets';
	import type { MapAssets } from '$lib/types/assets';

	let loaded = false;
	const assets: MapAssets = {};
	let two = null;
	let elem;

	onMount(async () => {
		elem = document.getElementById('map');
		// const two = new Two({ width: elem.clientWidth, height: elem.clientHeight }).appendTo(elem);
		two = new Two({ fitted: true }).appendTo(elem);

		await loadAssets(two, assets);

		let offset = 26;
		let row_offset = 32;
		let height_offset = 19;

		for (let i = 0; i < 18; i++) {
			let hex = assets.forest.clone();
			hex.translation.x = (38 + offset) * i + 10;
			hex.translation.y = 100;
			two.add(hex);
		}

		for (let i = 0; i < 17; i++) {
			let hex = assets.grass.clone();
			hex.translation.x = (38 + offset) * i + 10 + row_offset;
			hex.translation.y = 100 + height_offset;
			two.add(hex);
		}

		for (let i = 0; i < 18; i++) {
			let hex = assets.industrial.clone();
			hex.translation.x = (38 + offset) * i + 10;
			hex.translation.y = 100 + height_offset * 2;
			two.add(hex);
		}

		for (let i = 0; i < 17; i++) {
			let hex = assets.residential.clone();
			hex.translation.x = (38 + offset) * i + 10 + row_offset;
			hex.translation.y = 100 + height_offset * 3;
			two.add(hex);
		}

		loaded = true;
		two.render();
		two.update();
	});

	function fit() {
		two.fit(elem);
		console.log('resize');
	}
</script>

<svelte:window on:resize={fit} />

<section id="map" class:hidden={!loaded}>
	<div class="container">Map</div>
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    width: calc(100% - $p-side-width - $p-side-width)
    //background: lightblue
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    left: $p-side-width
    transition: 40ms opacity ease-in-out

  .hidden
    opacity: 0

  .container
    padding: 1em
    position: absolute
</style>
