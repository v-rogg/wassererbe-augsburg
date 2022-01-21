<script lang="ts">
  import { DisplayMode } from "$lib/enums";
  import { mode } from "../stores";
</script>

<svelte:head>
  {#if $mode === DisplayMode.Map}
    <link rel="icon" href="favicon.svg" />
  {:else if $mode === DisplayMode.Percent}
    <link rel="icon" href="favicon-green.svg" />
  {/if}
</svelte:head>

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

    @media (prefers-color-scheme: dark)
      --c-black: #{$c-white}
      --c-grey-90: #{$c-grey-10}
      --c-grey-70: #{$c-grey-30}
      --c-grey-50: #{$c-grey-50}
      --c-grey-30: #{$c-grey-70}
      --c-grey-10: #{$c-grey-90}
      --c-white: #{$c-black}

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
