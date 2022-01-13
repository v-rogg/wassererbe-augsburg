<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { _ } from '$lib/actions/helpers';
	import { mapData, mode, year, yearChanges } from '$lib/../stores';
	import { DisplayMode } from '$lib/enums';
	import gsap from 'gsap';

	export let mapSVG;
	let waterAll, waterBGAll;
	let yearUnsub, modeUnsub;

	const blue = '#18A0FB';
	const white = '#FFFFFF';
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
				waterAll.forEach((e: HTMLElement) => (e.style.stroke = blue));
				waterBGAll.forEach((e: HTMLElement) => (e.style.stroke = white));
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

	onMount(async () => {
		waterAll = document.querySelectorAll(`[id*="_w"]`);
		waterBGAll = document.querySelectorAll(`[id*="_bgw"]`);

		waterAll.forEach((el) => {
			const len = el.getTotalLength();
			el.style.strokeDasharray = len;
			el.style.strokeDashoffset = len;
			el.style.stroke = blue;
		});

		// TODO: Add GSAP .to
		// Der erste Parameter ist die ID des Flusses (siehe svg), duration und delay musst bei jedem fluss dann verändern. Momentan hast du 5s Zeit für die Ladeanimation. Das kannst du aber verändern, siehe nächstes Kommentar
		gsap.to('#_w-n', { 'stroke-dashoffset': 0, duration: 3, delay: 1, ease: 'none' });

		setTimeout(() => {
			yearUnsub = year.subscribe(() => recolor());
			modeUnsub = mode.subscribe(() => recolor());
		}, 5000); // waits 5s until everything is displayed
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
		transition-property: fill, stroke

	:global(#map "id*=['#_-']" path)
		stroke-dasharray: 600
		stroke-dashoffset: 600
</style>
