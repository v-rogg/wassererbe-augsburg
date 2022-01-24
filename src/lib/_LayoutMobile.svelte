<script lang="ts">
  import { mode, showHamburger, firstLoad } from "../stores.ts";
  import HamburgerButton from "$lib/Primitives/HamburgerButton.svelte";
  import { fade } from "svelte/transition";
</script>

<header class="active-{$mode}" class:load={$firstLoad}>
  <slot name="header_left" />
  <HamburgerButton />
</header>

<main class="container">
  <div class="app active-{$mode}">
    <div class="center">
      <slot name="center" />
    </div>
    <div class="lower_center">
      <slot name="lower_center" />
    </div>
    <div class="fourth">
      <slot name="4th" />
    </div>
    <div class="fifth">
      <slot name="5th" />
    </div>
  </div>
</main>

{#if $showHamburger}
<div class="hamburger active-{$mode}" transition:fade>
  <slot name="hamburger" />

<!--  <div>-->
<!--    <About />-->
<!--    <Legal />-->
<!--  </div>-->
</div>
{/if}

<style lang="sass">
  @import "src/styles/theme"

  .container
    height: 100%
    width: 100%
    position: absolute
    background: var(--c-white)

  .app
    display: grid
    grid-template-rows: 2fr 4fr 1fr 2rem
    gap: 2rem
    margin: 10rem 3rem 5rem
    height: calc(100% - 15rem)

  header
    display: flex
    justify-content: space-between
    align-items: center
    height: 10rem
    margin: 0 3rem
    position: absolute
    width: calc(100% - 6rem)
    z-index: 1090
    transition: 1s
    transition-delay: 2.5s

  .load
    opacity: 0

  .lower_center
    overflow-y: auto
    margin-top: 3rem
    height: calc(100% - 3rem)
    scrollbar-width: thin
    scrollbar-color: var(--c-grey-30) var(--c-grey-10)
    scrollbar-gutter: stable

    &::-webkit-scrollbar
      width: 4px

    &::-webkit-scrollbar-track
      background-color: var(--c-grey-10)

    &::-webkit-scrollbar-thumb
      height: 30px
      background-color: var(--c-grey-30)

  .fourth, .fifth
    display: flex
    //align-items: center

  .fifth
    padding-top: .5rem
    align-items: flex-start

  :global(.active-0)
    --active: #{$c-blue}

  :global(.active-1)
    --active: #{$c-green}

  .hamburger
    background: var(--c-white)
    height: calc(100% - 20rem)
    width: calc(100% - 6rem)
    padding: 10rem 3rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    position: absolute
    z-index: 1080
    color: var(--c-black)

    >div
      display: flex
      justify-content: space-between
      width: 100%

</style>
