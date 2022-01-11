<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import Button from '$lib/primitives/Button.svelte';
	import MediaControls from '$lib/components/MediaControls.svelte';
</script>

<section id="manipulator">
	<!--	<div class="container">Manipulator</div>-->
	<!--	<div class="mode-selector">-->
	<!--		<Button>Button</Button>-->
	<!--		<Button>Button</Button>-->
	<!--	</div>-->
	<div />
	<!--	<Timeline />-->
	<MediaControls />

	<Button hotkey="M" title="Referenzkarten">
		<svg
			height="1em"
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="map"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 576 512"
			><path
				fill="currentColor"
				d="M384 476.1L192 421.2V35.93L384 90.79V476.1zM416 88.37L543.1 37.53C558.9 31.23 576 42.84 576 59.82V394.6C576 404.4 570 413.2 560.9 416.9L416 474.8V88.37zM15.09 95.13L160 37.17V423.6L32.91 474.5C17.15 480.8 0 469.2 0 452.2V117.4C0 107.6 5.975 98.78 15.09 95.13V95.13z"
			/></svg
		>
	</Button>

	<Button hotkey="L" title="Legende" active={false}>
		<svg
			height="1em"
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="hexagon"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			><path
				fill="currentColor"
				d="M505.8 278.6l-105.4 179.2C392.3 471.5 377.5 480 361.4 480H150.6c-16.11 0-30.93-8.516-39.05-22.17l-105.4-179.2c-8.234-14-8.234-31.27 0-45.27l105.4-179.2C119.7 40.52 134.5 32 150.6 32h210.8c16.11 0 30.93 8.516 39.05 22.16l105.4 179.2C514.1 247.4 514.1 264.6 505.8 278.6z"
			/></svg
		>
	</Button>
</section>

<style lang="sass">
  @import "../styles/variables"

  #manipulator
    height: $p-bottom-spacing
    width: calc(100% - ($p-side-width * 2) + ($p-side-offset * 2))
    position: absolute
    //bottom: 2em
    bottom: 0
    left: calc($p-side-width - $p-side-offset)
    //background: lightsalmon
    display: grid
    grid-template-columns: $p-side-offset auto $p-side-offset

  .container
    padding: 1em

  .mode-selector
    border: 1px dashed black
    padding: 1em
</style>
