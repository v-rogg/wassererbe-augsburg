<script lang="ts">
  import { DisplayMode } from "$lib/enums";
  import { mode, isMobile, displayReference, isDarkMode } from "../stores";
  import { browser } from "$app/env";

  let innerHeight;
  let innerWidth;

  function recheck(w, h) {
    if (browser) {
      const c = window.matchMedia("only screen and (max-width: 1500px)").matches || window.matchMedia("only screen and (max-height: 750px)").matches
      isMobile.set(c)
      return c
    } else {
      return false
    }
  }

  $: check = recheck(innerWidth, innerHeight)
</script>

<svelte:head>
  {#if $mode === DisplayMode.Map}
    <link rel="icon" href="favicon.svg" />
  {:else if $mode === DisplayMode.Percent}
    <link rel="icon" href="favicon-green.svg" />
  {/if}
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

<!--<span style="color: var(&#45;&#45;c-black)">-->
<!--{$displayReference} {$isDarkMode}-->
<!--</span>-->
<slot/>

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
