<script lang="ts">
	import {
		selectedEoI,
		selectedStory,
		stories,
		storyDirection,
		year,
		yearChanges,
		yearLimits,
		defaultYearChangeDuration,
		playback
	} from '../../stores';
	import { fade } from 'svelte/transition';
	import { PlaybackMode } from '$lib/enums';
	import { _, goto } from '$lib/actions/helpers';
	import { onMount } from 'svelte';

	const timeDifference = $yearLimits.max - $yearLimits.min;
	let displayYears = [];
	for (let i = 0; i < timeDifference; i += 100) {
		let y = Math.ceil(($yearLimits.min + i) / 100) * 100;
		if (y != $yearLimits.max && y != $yearLimits.min) {
			displayYears.push(y);
		}
	}

	let mouseX = 0;
	let timelineWidth: number = null;
	let dragging = false;

	let offsetYears = 0;

	onMount(() => {
		window.addEventListener('mousedown', (e) => {
			mouseX = e.clientX;
			timelineWidth = _('.bar').offsetWidth;
		});

		window.addEventListener('mousemove', (e) => {
			if (dragging) {
				let offset = e.clientX - mouseX;
				let offsetRelative = offset / timelineWidth;
				offsetYears = offsetRelative * timeDifference;
				if ($year + offsetYears > $yearLimits.min && $year + offsetYears < $yearLimits.max) {
					let yearOffset = $year + offsetYears;
					year.update((n) => (n = yearOffset), { duration: 0 });
					mouseX = e.clientX;
				} else if ($year + offsetYears < $yearLimits.min) {
					year.update((n) => (n = $yearLimits.min), { duration: 0 });
				} else if ($year + offsetYears > $yearLimits.max) {
					year.update((n) => (n = $yearLimits.max), { duration: 0 });
				}
			}
		});

		window.addEventListener('mouseup', (e) => {
			dragging = false;
			document.body.style.userSelect = null;
		});
	});
</script>

<div class="timeline">
	<!--Timeline and Arrow  -->
	<div class="bar" />
	<svg
		viewBox="0 0 8 14"
		fill="none"
		class="arrow"
		on:click={() => {
			goto($yearLimits.max);
		}}
	>
		<path d="M1 1L6 7L1 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
	</svg>

	<!--Min Year  -->
	<div class="yearLimitMin displayYear" class:minSelected={$selectedEoI >= 0}>
		{$yearLimits.min}
	</div>

	<!--Max Year-->
	<div class="yearLimitMax displayYear removeLine" class:maxSelected={$selectedEoI >= 0}>
		{$yearLimits.max === new Date().getFullYear() ? 'Heute' : $yearLimits.max}
	</div>

	<!--Every Century-->
	{#each displayYears as year}
		<div
			class="displayYear"
			style="left: {((year - $yearLimits.min) / timeDifference) * 100}%"
			class:displaySelected={$selectedEoI >= 0}
		>
			{year}
		</div>
	{/each}

	<!--Current Year-->
	<div
		class="displayYear currentYear"
		style="left: {(($year - $yearLimits.min) / timeDifference) * 100}%"
		class:removeLine={(($year - $yearLimits.min) / timeDifference) * 100 > 99.5}
		class:currentSelected={$selectedEoI >= 0}
		on:mousedown={() => {
			dragging = true;
			document.body.style.userSelect = 'none';
		}}
	>
		{Math.floor($year)}
	</div>

	<!-- Year Array  -->
	{#each $yearChanges as y}
		{#if y !== $yearLimits.max}
			<div
				class="displayYear yearChanges"
				style="left: {((y - $yearLimits.min) / timeDifference) * 100}%; transform: {y ==
				$yearLimits.min
					? 'translate(calc(-50%), 0)'
					: 'translate(-50%, 0)'}"
				on:click={() => {
					goto(y);
				}}
			/>
		{/if}
	{/each}
</div>
{#if dragging}
	<div class="grabboard" />
{/if}

<style lang="sass">
	@import "src/styles/theme"
	@import "src/styles/variables"

	.timeline
		display: flex
		align-items: center
		position: relative
		height: 100%
		width: 100%

	.bar
		position: absolute
		width: 100%
		height: 2px
		border-radius: 2px
		color: $c-black
		background: currentColor

	.arrow
		position: absolute
		right: 0
		transform: translateX(3px)
		transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)
		height: 14px

		&:hover
			height: 20px
			cursor: pointer

		&:active
			height: 16px


	.displayYear
		position: absolute
		font-size: .875em
		transform: translate(-50%, 1.75em)
		transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
		transition-delay: 200ms

		&:before
			content: ""
			color: $c-black
			background: currentColor
			width: 1px
			height: calc(1.75em - 10px)
			position: absolute
			left: 50%
			top: calc(-100% + 1px)
			transform: translateX(-50%)
			transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
			transition-delay: 200ms

	.yearLimitMax
		right: 0
		transform: translate(50%, 1.75em) !important

	.maxSelected
		transform: translate(50%, 2.3em) !important

		&:before
			height: calc(2.3em - 11px)
			top: calc(-100% - 6px)

	.yearLimitMin
		transform: translate(calc(-50% - 1px), 1.75em) !important

	.minSelected
		transform: translate(calc(-50% - 1px), 2.3em) !important

		&:before
			height: calc(2.3em - 11px)
			top: calc(-100% - 6px)

	.currentYear
		transform: translate(-50%, -1.5em)
		font-size: 1.125em
		font-weight: $fw-bold
		transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
		transition-delay: 200ms
		transition-property: transform

		&:hover:not(&:active)
			cursor: grab

		&:before
			width: 2px
			top: auto
			height: calc(1.5em - 13px)
			bottom: calc(-100% + 8px)
			transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
			transition-delay: 200ms
			transition-property: height, bottom

	.removeLine
		&:before
			opacity: 0

	.yearChanges
		transform: translate(calc(-50% - 1px), 0)

		&:before
			width: 8px
			height: 8px
			border-radius: 12px
			top: -4px

		&:hover
			cursor: pointer
			&:before
				transition-delay: 0s
				transition-duration: 100ms
				width: 14px
				height: 14px
				top: -7px

		&:active
			&:before
				width: 10px
				height: 10px
				top: -5px

	:global(.noCursor)
		*
			cursor: none !important

			&:before
				cursor: none !important

			&:after
				cursor: none !important

			&:hover
				cursor: none !important

	.grabboard
		position: fixed
		top: 0
		left: 0
		width: 100vw
		height: 100vh
		z-index: 9999
		cursor: none

		&:hover
			cursor: none
</style>
