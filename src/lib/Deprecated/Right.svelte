<script>
	import LegendSide from '$lib/Deprecated/LegendSide.svelte';
	import StoryInfo from '$lib/Deprecated/StoryInfo.svelte';
</script>

<section id="right">
	<!--	<div class="container">Right</div>-->
	<LegendSide />
	<StoryInfo />
</section>

<style lang="sass">
  @import "../../styles/variables"

  #right
    width: $p-side-width
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    right: 0

  .container
    padding: 1em
</style>
