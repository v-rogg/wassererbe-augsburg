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
		// "residential": "#B1785B",
		r: '#a6604c',
		// "industrial": "#D7D7D7",
		i: '#C0C0C0'
		// city: '#323232',
		// unknown: '#eaeaea'
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
			// recolor();
			_(`#water`).style.fill = '#18A0FB';
			_(`#water-shadow`).style.fill = '#FFFFFF';
			year.subscribe(() => recolor());
		}, 1);
	});
</script>

<section id="map">
	{#if mapSVG}
		<div class="vector">
			{@html mapSVG}
		</div>
	{/if}
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    display: flex
    align-items: center
    width: calc(100% - $p-side-width - $p-side-width)
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    left: $p-side-width
    opacity: 1

  .vector
    width: 100%

  :global(#map path)
    transition: .2s fill linear
</style>
