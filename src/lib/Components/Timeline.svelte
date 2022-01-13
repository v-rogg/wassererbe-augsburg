<script lang="ts">
	import { playback, selectedEoI, year, yearChanges, yearLimits } from '../../stores';
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

		{#if $playback === PlaybackMode.FastForward}
			<span class="currentPlaybackMode forward">
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="forward"
					class="svg-inline--fa fa-forward"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z"
					/></svg
				>
			</span>
		{:else if $playback === PlaybackMode.StepForward}
			<span class="currentPlaybackMode forward">
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="forward-step"
					class="svg-inline--fa fa-forward-step"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><path
						fill="currentColor"
						d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"
					/></svg
				>
			</span>
		{:else if $playback === PlaybackMode.Forward}
			<span class="currentPlaybackMode forward">
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fad"
					data-icon="play"
					class="svg-inline--fa fa-play"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><g class="fa-duotone-group"
						><path class="fa-secondary" fill="currentColor" d="" /><path
							class="fa-primary"
							fill="currentColor"
							d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"
						/></g
					></svg
				>
			</span>
		{:else if $playback === PlaybackMode.StepBackward}
			<span class="currentPlaybackMode backward">
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="backward-step"
					class="svg-inline--fa fa-backward-step"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><path
						fill="currentColor"
						d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z"
					/></svg
				>
			</span>
		{:else if $playback === PlaybackMode.FastBackward}
			<span class="currentPlaybackMode backward">
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="backward"
					class="svg-inline--fa fa-backward"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"
					/></svg
				>
			</span>
		{/if}
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

	.currentPlaybackMode
		position: absolute
		font-size: $fs-micro
		display: flex
		align-items: center
		height: 100%
		top: -1px

	.forward
		right: -1.5em

	.backward
		left: -1.5em

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
