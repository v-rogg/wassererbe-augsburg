<script lang="ts">
  import { mode } from "../stores.ts";
</script>

<main class="container">
  <div class="app active-{$mode}">
    <header>
      <slot name="header_left" />

      <div class="hamburger">X</div>
    </header>
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

<style lang="sass">
  @import "src/styles/theme"

  .container
    height: 100%

  .app
    display: grid
    grid-template-rows: 1fr 3fr 3fr 1fr 1fr
    margin: 1rem 3rem
    height: 100%

  header
    display: flex
    justify-content: space-between
    align-items: center

  .center
    height: 200px

  .lower_center
    overflow-y: auto
    height: 100%

  .fourth, .fifth
    display: flex
    align-items: center

  :global(.active-0)
    --active: #{$c-blue}

  :global(.active-1)
    --active: #{$c-green}
</style>
