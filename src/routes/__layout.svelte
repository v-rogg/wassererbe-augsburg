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
</style>
