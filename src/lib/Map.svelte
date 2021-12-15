<script lang="ts">
	import { onMount } from 'svelte';
  import { _ } from "$lib/actions/helpers";

  export let mapSVG;
  export let mapData;

	onMount(async () => {
    _(`#_${0}-${13}`).style.fill = mapData.map[0][13]["1600"].toString();
    _(`#_${0}-${4}`).style.fill = mapData.map[0][4]["1600"].toString();
    _(`#_${0}-${8}`).style.fill = mapData.map[0][8]["1600"].toString();
  });
</script>

<section id="map">
  {#if mapSVG}
    <div class="vector">
      {@html mapSVG}
    </div>
  {/if}
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    display: flex
    align-items: center
    width: calc(100% - $p-side-width - $p-side-width)
    background: lightblue
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    left: $p-side-width
    opacity: 1

  .vector
    width: 100%
</style>
