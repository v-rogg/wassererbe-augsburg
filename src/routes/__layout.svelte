<script lang="ts">
  import { DisplayMode } from "$lib/enums";
  import { mode, isMobile, displayReference, firstLoad } from "../stores";
  import { browser } from "$app/env";
  import { onMount } from "svelte";

  let innerHeight;
  let innerWidth;

  function recheck(w, h) {
    if (browser) {
      const c = window.matchMedia("only screen and (max-width: 1300px)").matches || window.matchMedia("only screen and (max-height: 650px)").matches
      isMobile.set(window.matchMedia("only screen and (max-width: 1300px)").matches || window.matchMedia("only screen and (max-height: 650px)").matches);
      return c;
    } else {
      return false;
    }
  }

  $: check = recheck(innerWidth, innerHeight);

  onMount(() => {
    setTimeout(() => {
      $firstLoad = false;
    }, 2000);
  });
</script>

<svelte:head>
  <meta name="description" content="Wir sind Nadine Keller und Valentin Rogg – Masterstudenten im Bereich Interaktive Mediensysteme an der Hochschule Augsburg.
    Für den Kurs Datenvisualisierung haben wir es uns zur Aufgabe gemacht, die Veränderung der Stadt Augsburg über die Jahre 1980 bis 2022
    darzustellen. Augsburg hat durch seine vielen Flüsse und Kanäle ein besonderes Relikt, welches die Stadtveränderung maßgeblich beeinflusst hat.
    So entstand unser Projekt unter dem Namen Wassererbe Augsburg." />
  {#if $mode === DisplayMode.Map}
    <link rel="icon" type="image/svg" href="favicon.svg" />
  {:else if $mode === DisplayMode.Percent}
    <link rel="icon" type="image/svg" href="favicon-green.svg" />
  {/if}
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

<span style="color: var(--c-black); position: absolute;">
  {innerWidth}
  {innerHeight}
  {check}
  {$firstLoad}
</span>
<slot />

<style lang="sass">
  @import "src/styles/theme"

  \:root
    --c-black: #{$c-black}
    --c-grey-90: #{$c-grey-90}
    --c-grey-70: #{$c-grey-70}
    --c-grey-50: #{$c-grey-50}
    --c-grey-30: #{$c-grey-30}
    --c-grey-10: #{$c-grey-10}
    --c-white: #{$c-white}
    --c-river: #{$c-blue}
    --c-river-dull: #d0ecfe

    @media (prefers-color-scheme: dark)
      --c-black: #{$c-white}
      --c-grey-90: #{$c-grey-10}
      --c-grey-70: #{$c-grey-30}
      --c-grey-50: #{$c-grey-50}
      --c-grey-30: #{$c-grey-70}
      --c-grey-10: #{$c-grey-90}
      --c-white: #{$c-black}
      --c-river: #{$c-blue}
      --c-river-dull: #103044

    @media (max-height: 960px)
      font-size: clamp(13px, 1.6vh, 16px)
      //font-size: 13px

  :global(.residential)
    &:before
      background: $c-residential !important

  :global(.agricultural)
    &:before
      background: $c-agricultural !important

  :global(.industrial)
    &:before
      background: $c-industrial !important

  :global(.forest)
    &:before
      background: $c-forest !important

  :global(.grassland)
    &:before
      background: $c-grassland !important

  :global(.water)
    &:before
      background: $c-water !important
</style>
