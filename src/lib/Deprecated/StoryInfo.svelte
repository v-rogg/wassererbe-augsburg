<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { selectedEoI, selectedStory, stories, storyDirection } from '$lib/../stores';
	import { StoryDirection } from '$lib/enums';
	import { cubicIn, cubicOut, linear, quadIn, quadOut, sineIn, sineOut } from 'svelte/easing';

	const movementAmount = 100;

	function checkDirectionIn() {
		return $storyDirection === StoryDirection.Down ? movementAmount / 2 : -movementAmount / 2;
	}

	function checkDirectionOut() {
		return $storyDirection === StoryDirection.Down ? -movementAmount : movementAmount;
	}
</script>

<section>
	{#each $stories as story, sIndex}
		{#each story.events_of_interest as EoI, eoiIndex}
			{#if sIndex === $selectedStory && eoiIndex === $selectedEoI}
				<div
					class="events"
					in:fly={{
						duration: 900,
						y: checkDirectionIn(),
						delay: 400,
						easing: sineOut,
						opacity: -0.2
					}}
					out:fly={{ duration: 600, y: checkDirectionOut(), easing: sineIn, opacity: -0.5 }}
				>
					<div class="zoneIcon">
						<img
							src="/legend/{$stories[$selectedStory].events_of_interest[$selectedEoI]
								.zone_type}.svg"
							alt=""
						/>
					</div>
					{#if $stories[$selectedStory].shape === 'circle'}
						<div class="storyIcon">
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="15" cy="15" r="15" fill="#DAEACD" />
							</svg>
							<span>
								{$selectedEoI + 1}
							</span>
						</div>
					{:else if $stories[$selectedStory].shape === 'square'}
						<div class="storyIcon">
							<svg
								width="31"
								height="30"
								viewBox="0 0 31 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect width="31" height="30" rx="4" fill="#CBE6F8" />
							</svg>
							<span>
								{$selectedEoI + 1}
							</span>
						</div>
					{:else if $stories[$selectedStory].shape === 'triangle'}
						<div class="storyIcon">
							<svg
								width="34"
								height="30"
								viewBox="0 0 34 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								style="transform: translate(0, -2px)"
							>
								<path
									d="M13.5561 2.82943C15.1042 0.208871 18.8957 0.208876 20.4439 2.82944L32.4874 23.2154C34.0627 25.8819 32.1406 29.25 29.0435 29.25H4.95641C1.85939 29.25 -0.0627815 25.8819 1.51251 23.2154L13.5561 2.82943Z"
									fill="#D9D9D9"
								/>
							</svg>
							<span>
								{$selectedEoI + 1}
							</span>
						</div>
					{/if}
					<h2>
						{$stories[$selectedStory].events_of_interest[$selectedEoI].name}
					</h2>
					<p>
						{$stories[$selectedStory].events_of_interest[$selectedEoI].description}
					</p>
				</div>
				{#if $selectedEoI + 1 < $stories[$selectedStory].events_of_interest.length}
					<div class="nextUp">
						<button
							in:fade={{ duration: 200 }}
							out:fade={{ duration: 200, delay: 60 }}
							on:click={() => {
								eoiIndex + 1 > $selectedEoI
									? ($storyDirection = StoryDirection.Down)
									: ($storyDirection = StoryDirection.Up);
								$selectedEoI = eoiIndex + 1;
							}}
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="arrow-right"
								class="svg-inline--fa fa-arrow-right"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								><path
									fill="currentColor"
									d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
								/></svg
							>
							{#if $stories[$selectedStory].shape === 'circle'}
								<div class="storyIcon">
									<svg
										width="30"
										height="30"
										viewBox="0 0 30 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="15" cy="15" r="15" fill="#DAEACD" />
									</svg>
									<span>
										{$selectedEoI + 2}
									</span>
								</div>
							{:else if $stories[$selectedStory].shape === 'square'}
								<div class="storyIcon">
									<svg
										width="31"
										height="30"
										viewBox="0 0 31 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect width="31" height="30" rx="4" fill="#CBE6F8" />
									</svg>
									<span>
										{$selectedEoI + 2}
									</span>
								</div>
							{:else if $stories[$selectedStory].shape === 'triangle'}
								<div class="storyIcon">
									<svg
										width="34"
										height="30"
										viewBox="0 0 34 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										style="transform: translate(0, -2px)"
									>
										<path
											d="M13.5561 2.82943C15.1042 0.208871 18.8957 0.208876 20.4439 2.82944L32.4874 23.2154C34.0627 25.8819 32.1406 29.25 29.0435 29.25H4.95641C1.85939 29.25 -0.0627815 25.8819 1.51251 23.2154L13.5561 2.82943Z"
											fill="#D9D9D9"
										/>
									</svg>
									<span>
										{$selectedEoI + 2}
									</span>
								</div>
							{/if}
						</button>
					</div>
				{/if}
			{/if}
		{/each}
	{/each}
</section>

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

  section
    position: absolute
    top: 80px
    left: 50%
    transform: translate(-50%, 0)
    width: $p-side-content-width
    bottom: 0

  .events
    position: absolute
    height: 100%
    width: 100%

  .storyIcon
    width: 32px
    display: flex
    align-items: center
    justify-content: center

    svg
      position: absolute
      z-index: -1

    span
      font-weight: $fw-medium

  .zoneIcon
    width: 100%
    display: flex
    justify-content: center
    margin-bottom: 2rem
    img
      width: 100px

  .nextUp
    display: flex
    justify-content: end
    width: 100%
    position: absolute
    bottom: 0

    button
      font-size: 1em
      font-weight: $fw-medium
      font-family: "IBM Plex Sans", sans-serif
      background: none
      border: none
      display: flex


      &:hover
        cursor: pointer

    .fa-arrow-right
      width: 1em
      margin-right: .5em
</style>
