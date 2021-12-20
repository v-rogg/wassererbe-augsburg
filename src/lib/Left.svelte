<script>
	import StorySelector from '$lib/components/StorySelector.svelte';
	import EoISelector from '$lib/components/EoISelector.svelte';
	import Brand from '$lib/components/Brand.svelte';
	import { selectedStory } from '../stores';
	import { fade } from 'svelte/transition';
</script>

<section id="left">
	<Brand />
	{#if $selectedStory < 0}
		<div class="description" transition:fade={{ duration: 200 }}>
			Proektbeschreibung - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium
			nulla quis diam egestas consectetur.
		</div>
	{/if}
	<div>
		<StorySelector />
		<EoISelector />
	</div>
</section>

<style lang="sass">
  @import "../styles/variables"

  #left
    width: $p-side-width
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing

  .description
    position: absolute
    top: 100px
    left: 50%
    transform: translate(-50%, 0)
    width: $p-side-content-width
    height: 115px
    overflow-y: auto
</style>
