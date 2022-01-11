<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from '$lib/actions/helpers';
	import { playback, year, yearChanges, yearLimits } from '../stores';
	import { PlaybackMode } from '$lib/enums';

	export let mapSVG;
	export let mapData;

	const color = {
		g: '#7B9F5C',
		a: '#CBAD1B',
		f: '#5E714D',
		r: '#a6604c',
		i: '#C0C0C0'
	};

	function findNextYear(): number {
		let num = 0;
		const sortedYears = $yearChanges;
		sortedYears.sort((a, b) => {
			return b - a;
		});
		sortedYears.forEach((y) => {
			if (y <= $year && y > num) {
				num = y;
			}
		});
		return num;
	}

	function recolor() {
		const colorYear = findNextYear();
		mapData.map.forEach((row, r_index) => {
			row.forEach((entry, c_index) => {
				try {
					_(`#_${r_index}-${c_index}`).style.fill =
						color[mapData.map[r_index][c_index][colorYear].toLowerCase()];
				} catch (e) {}
			});
		});
	}

	onMount(async () => {
		setTimeout(() => {
			_(`#water`).style.fill = '#18A0FB';
			_(`#water-shadow`).style.fill = '#FFFFFF';
			year.subscribe(() => recolor());
		}, 1);
	});
</script>

<section id="map">
	{#if mapSVG}
    {@html mapSVG}
	{/if}
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    height: 100%
    width: 100%
    opacity: 1

  :global(#map path)
    transition: .2s fill linear
</style>
