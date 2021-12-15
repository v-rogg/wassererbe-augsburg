<script lang="ts">
	import { onMount } from 'svelte';
  import { _ } from "$lib/actions/helpers";

	let svgMap = null;
  let dataMap = null;
  let loaded = false;

  async function init() {
    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/maps.json`)
      .then((res) => res.json())
      .then((data) => {
        dataMap = data;
        console.log('json loaded');
      })
      .catch((error) => console.log(error));

    await fetch(`${import.meta.env.VITE_PUBLIC_BASE_PATH}/map.svg`)
      .then((res) => res.text())
      .then((data) => {
          svgMap = data;
          console.log('svg loaded');
      })
      .catch((error) => console.log(error));
  }

	onMount(async () => {
    await init();

    _(`#_${0}-${13}`).style.fill = dataMap.map[0][13]["1600"].toString();
    _(`#_${0}-${4}`).style.fill = dataMap.map[0][4]["1600"].toString();
    _(`#_${0}-${8}`).style.fill = dataMap.map[0][8]["1600"].toString();

    loaded = true;
	});
</script>

<section id="map">
	<div class="vector" class:hidden={!loaded}>
		{@html svgMap}
	</div>
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
    transition: 20ms opacity ease-in-out

  .hidden
    opacity: 0

  .vector
    width: 100%
</style>
