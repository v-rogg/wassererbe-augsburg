<script lang="ts">
	import { selectedStory, stories, selectedEoI, storyDirection } from '$lib/../stores';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { StoryDirection } from '$lib/enums';

	let selectedS;
	const unsub = selectedStory.subscribe((x) => (selectedS = x));

	onDestroy(() => {
		unsub();
	});
</script>

{#if $selectedStory >= 0}
	<menu transition:fade={{ delay: 400 }}>
		{#if $stories[selectedS].shape === 'circle'}
			<ul>
				{#each $stories[selectedS].events_of_interest as eoi, index}
					<li
						in:fade={{ delay: index * 50 + 100 }}
						out:fade={{ delay: index * 50 }}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						class:selected={$selectedEoI === index}
					>
						<div class="number">
							{#if $selectedEoI === index}
								<svg
									width="30"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									transition:fade
								>
									<circle cx="15" cy="15" r="15" fill="#DAEACD" />
								</svg>
							{/if}
							<span class="index">
								{index + 1}
							</span>
						</div>
						<div>
							<div class="name">
								{eoi.name}
							</div>
							<div class="year">
								{eoi.year}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		{#if $stories[selectedS].shape === 'square'}
			<ul>
				{#each $stories[selectedS].events_of_interest as eoi, index}
					<li
						in:fade={{ delay: index * 50 + 100 }}
						out:fade={{ delay: index * 50 }}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						class:selected={$selectedEoI === index}
					>
						<div class="number">
							{#if $selectedEoI === index}
								<svg
									width="31"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									transition:fade
								>
									<rect width="31" height="30" rx="4" fill="#CBE6F8" />
								</svg>
							{/if}
							<span class="index">
								{index + 1}
							</span>
						</div>
						<div>
							<div class="name">
								{eoi.name}
							</div>
							<div class="year">
								{eoi.year}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		{#if $stories[selectedS].shape === 'triangle'}
			<ul>
				{#each $stories[selectedS].events_of_interest as eoi, index}
					<li
						in:fade={{ delay: index * 50 + 100 }}
						out:fade={{ delay: index * 50 }}
						on:click={() => {
							index > $selectedEoI
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
							$selectedEoI = index;
						}}
						class:selected={$selectedEoI === index}
					>
						<div class="number">
							{#if $selectedEoI === index}
								<svg
									width="34"
									height="30"
									viewBox="0 0 34 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									style="transform: translate(-2px, -2px)"
									transition:fade
								>
									<path
										d="M13.5561 2.82943C15.1042 0.208871 18.8957 0.208876 20.4439 2.82944L32.4874 23.2154C34.0627 25.8819 32.1406 29.25 29.0435 29.25H4.95641C1.85939 29.25 -0.0627815 25.8819 1.51251 23.2154L13.5561 2.82943Z"
										fill="#D9D9D9"
									/>
								</svg>
							{/if}
							<span class="index">
								{index + 1}
							</span>
						</div>
						<div>
							<div class="name">
								{eoi.name}
							</div>
							<div class="year">
								{eoi.year}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</menu>
{/if}

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

  menu
    position: absolute
    top: 350px
    height: auto
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    margin: 0
    padding: 0
    width: $p-side-content-width
    overflow-y: auto

  ul
    margin: 0
    padding: 0
    position: absolute

  li
    margin: .5em 0
    padding: 0
    list-style: none
    display: grid
    grid-template-columns: 50px auto
    align-items: center

    &:hover
      cursor: pointer

    .number
      position: relative
      height: 30px
      width: 30px

      svg
        height: inherit
        width: auto

      .index
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        font-family: "IBM Plex Sans", sans-serif
        font-weight: $fw-medium

    .year
      font-size: .8em
      display: none

  .selected

    &:hover
      cursor: default

    .name
      font-weight: $fw-medium
</style>
