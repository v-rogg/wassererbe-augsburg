<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { _ } from '$lib/actions/helpers';
	import { mapData, mode, year, yearChanges } from '$lib/../stores';
	import { DisplayMode } from '$lib/enums';

	export let mapSVG;
	let waterAll, waterBGAll;
	let yearUnsub, modeUnsub;

	const color = {
		g: '#7B9F5C',
		a: '#CBAD1B',
		f: '#5E714D',
		r: '#a6604c',
		i: '#C0C0C0'
	};

	function findNextSmallerYear(): number {
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

	function countZones(): Map<string, number> {
		let count = {
			g: 0,
			a: 0,
			f: 0,
			r: 0,
			i: 0
		};

		const colorYear = findNextSmallerYear();

		$mapData.map.forEach((row, r_index) => {
			row.forEach((entry, c_index) => {
				count[$mapData.map[r_index][c_index][colorYear]]++;
			});
		});

		const unsortedMap = new Map(Object.entries(count));
		// const unsortedArray = [...unsortedMap];
		// const sortedArray = unsortedArray.sort(([key1, value1], [key2, value2]) =>  value2 - value1)
		return new Map(unsortedMap);
	}

	function recolor() {
		switch ($mode) {
			case DisplayMode.Map:
				waterAll.forEach((e: HTMLElement) => (e.style.stroke = '#18A0FB'));
				waterBGAll.forEach((e: HTMLElement) => (e.style.stroke = '#FFFFFF'));
				waterAll.forEach((e: HTMLElement) => (e.style.opacity = '1'));
				waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = '1'));

				const colorYear = findNextSmallerYear();
				$mapData.map.forEach((row, r_index) => {
					row.forEach((entry, c_index) => {
						try {
							let column_index = c_index.toString().padStart(2, '0');
							let row_index = r_index.toString().padStart(2, '0');
							// console.log(`_${row_index}-${column_index}`);
							_(`[id*='_${row_index}-${column_index}']`).style.fill =
								color[$mapData.map[r_index][c_index][colorYear].toLowerCase()];
						} catch (e) {}
					});
				});
				break;
			case DisplayMode.Percent:
				waterAll.forEach((e: HTMLElement) => (e.style.opacity = '0'));
				waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = '0'));

				const count = countZones();
				let step = 0;
				count.forEach((value, key) => {
					if (key !== undefined) {
						for (let i = 0; i < value; i++) {
							let paddedStep = step.toString().padStart(3, '0');

							try {
								_(`[id*='-${paddedStep}']`).style.fill = color[key.toString().toLowerCase()];
							} catch (e) {
								console.log(e, paddedStep);
							}

							step++;
						}
					}
				});
		}
	}

	// TODO: Add GSAP Timeline init

	onMount(async () => {
		waterAll = document.querySelectorAll(`[id*="$"]`);
		waterBGAll = document.querySelectorAll(`[id*="@"]`);

		// TODO: Add GSAP .to

		setTimeout(() => {
			yearUnsub = year.subscribe(() => recolor());
			modeUnsub = mode.subscribe(() => recolor());
		}, 1);
	});

	onDestroy(() => {
		yearUnsub;
		modeUnsub;
	});
</script>

<section id="map">
	{#if mapSVG}
		{@html mapSVG}
	{/if}
</section>

<style lang="sass">
  #map
    height: 100%
    width: 100%
    opacity: 1

  :global(#map path)
    transition: .2s linear
</style>
