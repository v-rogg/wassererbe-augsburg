<script>
  import StorySelector from "$lib/Deprecated/StorySelectorOld.svelte";
  import EoISelector from "$lib/Deprecated/EoISelector.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import { selectedStory } from "../../stores.js";
  import { fade } from "svelte/transition";
</script>

<section id="left">
  <Brand />
  {#if $selectedStory < 0}
    <div class="description" transition:fade={{ duration: 200 }}>
      <i>"Die Adern der Stadt"</i><br />
      Endecke wie sich Augsburg dank vielfältiger Wassernutzung seit Ende der frühen Neuzeit verändert hat.
    </div>
  {/if}
  <div>
    <StorySelector />
    <EoISelector />
  </div>
</section>

<style lang="sass">
  @import "../../styles/variables"

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
    text-wrap: normal
</style>
