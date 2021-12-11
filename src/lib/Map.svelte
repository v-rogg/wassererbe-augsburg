<script lang="ts">
  import Two from 'two.js';
  import { onMount } from 'svelte';
  import type { MapAssets } from '$lib/types/assets';

  let loaded = false;

  onMount(async () => {
    const elem = document.getElementById('map');
    const two = new Two({ type: Two.Types.webgl, renderer: Two.WebGLRenderer }).appendTo(elem);
    // const two = new Two({}).appendTo(elem);

    const assets: MapAssets = {};

    const agriculturalLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/agricultural.svg', (svg) => {
        assets.agricultural = svg;
        console.log('loaded agricultural');
        resolve();
      });
    });

    const grassLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/grass.svg', (svg) => {
        assets.grass = svg;
        console.log('loaded grass');
        resolve();
      });
    });

    const forestLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/forest.svg', (svg) => {
        assets.forest = svg;
        console.log('loaded forest');
        resolve();
      });
    });

    const industrialLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/industrial.svg', (svg) => {
        assets.industrial = svg;
        console.log('loaded industrial');
        resolve();
      });
    });

    const residentialLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/residential.svg', (svg) => {
        assets.residential = svg;
        console.log('loaded residential');
        resolve();
      });
    });

    const energyLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/energy.svg', (svg) => {
        assets.energy = svg;
        console.log('loaded energy');
        resolve();
      });
    });

    const specialLoad = new Promise((resolve) => {
      two.load('http://localhost:8080/map/special.svg', (svg) => {
        assets.special = svg;
        console.log('loaded special');
        resolve();
      });
    });

    await agriculturalLoad;
    await grassLoad;
    await forestLoad;
    await industrialLoad;
    await residentialLoad;
    await energyLoad;
    await specialLoad;

    console.log('all loaded');
    loaded = true;
    two.add(assets.forest.clone());
    two.render();
    two.update();
  });
</script>

<section id="map" class:hidden={!loaded} style="transition: 200ms opacity ease-in-out">
  <div class="container">Map</div>
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    width: calc(100% - $p-side-width - $p-side-width)
    background: lightblue
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    left: $p-side-width

  .hidden
    opacity: 0

  .container
    padding: 1em
</style>
