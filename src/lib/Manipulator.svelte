<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import Button from '$lib/components/Button.svelte';
	import MediaControls from '$lib/components/MediaControls.svelte';
</script>

<section id="manipulator">
	<!--	<div class="container">Manipulator</div>-->
	<div class="mode-selector">
		<Button>Button</Button>
		<Button>Button</Button>
	</div>
	<Timeline />
	<MediaControls />
</section>

<style lang="sass">
  @import "../styles/variables"

  #manipulator
    height: $p-bottom-spacing
    width: calc(100% - ($p-side-width * 2) + ($p-side-offset * 2))
    position: absolute
    bottom: 0
    left: calc($p-side-width - $p-side-offset)
    background: lightsalmon
    display: grid
    grid-template-columns: $p-side-offset auto $p-side-offset

  .container
    padding: 1em

  .mode-selector
    border: 1px dashed black
    padding: 1em
</style>
