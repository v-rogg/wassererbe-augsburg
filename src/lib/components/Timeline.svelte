<script lang="ts">
	import {
		selectedEoI,
		selectedStory,
		stories,
		year,
		yearLimits,
		storyDirection
	} from '../../stores';
	import { fade } from 'svelte/transition';
	import { StoryDirection } from '$lib/enums';

	const timeDifference = $yearLimits.max - $yearLimits.min;
	let displayYears = [];
	for (let i = 0; i < timeDifference; i += 100) {
		let y = Math.ceil(($yearLimits.min + i) / 100) * 100;
		if (y != $yearLimits.max && y != $yearLimits.min) {
			displayYears.push(y);
		}
	}
</script>

<div class="timeline">
	<!--Timeline and Arrow  -->
	<div class="bar" />
	<svg width="8" height="14" viewBox="0 0 8 14" fill="none" class="arrow">
		<path d="M1 1L6 7L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round" />
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
	>
		{Math.floor($year)}
	</div>

	<!-- Year Array  -->
	<!--{#each $yearChanges as year}-->
	<!--    <div class="displayYear yearChanges" style="left: {((year-$yearLimits.min) / timeDifference) * 100}%; transform: {year == $yearLimits.min ? 'translate(calc(-50%), 0)' : 'translate(-50%, 0)' }"/>-->
	<!--{/each}-->

	<!--EoIs-->
	{#if $stories[$selectedStory] !== undefined}
		{#each $stories[$selectedStory].events_of_interest as eoi, index}
			{#if eoi.year > $yearLimits.min && eoi.year < $yearLimits.max}
				{#if $stories[$selectedStory].shape === 'circle'}
					<button
						class="displayStory"
						style="left: {((eoi.year - $yearLimits.min) / timeDifference) * 100}%"
						in:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 + 100 }}
						out:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 }}
						class:selectedEoI={$selectedEoI === index}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						disabled={$selectedEoI === index}
					>
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="15" cy="15" r="15" fill={$selectedEoI === index ? '#DAEACD' : 'white'} />
						</svg>
						{index + 1}
					</button>
				{:else if $stories[$selectedStory].shape === 'square'}
					<button
						class="displayStory"
						style="left: {((eoi.year - $yearLimits.min) / timeDifference) * 100}%"
						in:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 + 100 }}
						out:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 }}
						class:selectedEoI={$selectedEoI === index}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						disabled={$selectedEoI === index}
					>
						<svg
							width="31"
							height="30"
							viewBox="0 0 31 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								width="31"
								height="30"
								rx="4"
								fill={$selectedEoI === index ? '#CBE6F8' : 'white'}
							/>
						</svg>
						{index + 1}
					</button>
				{:else if $stories[$selectedStory].shape === 'triangle'}
					<button
						class="displayStory"
						style="left: {((eoi.year - $yearLimits.min) / timeDifference) * 100}%"
						in:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 + 100 }}
						out:fade={{ delay: ((eoi.year - $yearLimits.min) / timeDifference) * 500 }}
						class:selectedEoI={$selectedEoI === index}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						disabled={$selectedEoI === index}
					>
						<svg
							width="34"
							height="30"
							viewBox="0 0 34 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style="transform: translate(-50%, calc(-2px - 50%))"
						>
							<path
								d="M13.5561 2.82943C15.1042 0.208871 18.8957 0.208876 20.4439 2.82944L32.4874 23.2154C34.0627 25.8819 32.1406 29.25 29.0435 29.25H4.95641C1.85939 29.25 -0.0627815 25.8819 1.51251 23.2154L13.5561 2.82943Z"
								fill={$selectedEoI === index ? '#D9D9D9' : 'white'}
							/>
						</svg>
						{index + 1}
					</button>
				{/if}
				<!--{eoi.year}-->
			{/if}
		{/each}
	{/if}
</div>

<style lang="sass">
  @import "src/styles/theme"
  @import "src/styles/variables"

  .timeline
    display: flex
    align-items: center
    position: relative

  .bar
    position: absolute
    width: 100%
    height: 2px
    border-radius: 2px
    background: $c-black

  .arrow
    position: absolute
    right: 0
    transform: translateX(3px)

  .displayYear
    position: absolute
    font-size: .875em
    transform: translate(-50%, 1.75em)
    transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
    transition-delay: 200ms

    &:before
      content: ""
      background: black
      width: 1px
      height: calc(1.75em - 10px)
      position: absolute
      left: 50%
      top: calc(-100% + 1px)
      transform: translateX(-50%)
      transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
      transition-delay: 200ms

  .displaySelected
    transform: translate(-50%, 2.3em)

    &:before
      height: calc(2.3em - 11px)
      top: calc(-100% - 6px)

  .displayStory
    position: absolute
    //font-size: .875em
    //font-size: 1em
    font-family: "IBM Plex Sans", sans-serif
    transform: translate(-50%, 0)
    background: none
    border: none
    color: $c-black
    font-size: .875em
    font-weight: $fw-medium

    &:hover:not(&:disabled)
      cursor: pointer

    svg
      position: absolute
      z-index: -1
      left: 50%
      top: 50%
      transform: translate(-50%, -50%) scale(.8)
      transition: 200ms transform cubic-bezier(0.645, 0.045, 0.355, 1)

  .selectedEoI
    font-size: 1em
    svg
      transform: translate(-50%, -50%)


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

    &:before
      width: 2px
      top: auto
      height: calc(1.5em - 13px)
      bottom: calc(-100% + 8px)
      transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
      transition-delay: 200ms
      transition-property: height, bottom

  .currentSelected
    transform: translate(-50%, -2em)

    &:before
      height: calc(2em - 13px)
      bottom: calc(-100% - 1px)

  .removeLine
    &:before
      opacity: 0

  .yearChanges
    transform: translate(calc(-50% - 1px), 0)

    &:before
      width: 2px
      height: calc(0.875em - 6px)
</style>
