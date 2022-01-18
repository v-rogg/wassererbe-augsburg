<script lang="ts">
  import { fly } from "svelte/transition";
  import { countTotal } from "../../stores";
  import { onDestroy } from "svelte";

  let count = new Map;
  const unsubCountTotal = countTotal.subscribe((x) => count = x)

  onDestroy(() => {
    unsubCountTotal
  })
</script>

<section transition:fly={{ duration: 200, x: 10 }}>
  <p>Nutzung der Zone</p>
  <div class="icons">
    <div>
      <div class="svg number">
        <img src="/legend/agricultural.svg" alt="" />
        {#if count.get('a') != undefined}
          <span>{count.get('a')}</span>
        {/if}
      </div>
      Landwirtschaft
    </div>
    <div>
      <div class="svg number">
        <img src="/legend/grassland.svg" alt="" />
        {#if count.get('g') != undefined}
          <span>{count.get('g')}</span>
        {/if}
      </div>
      Grasland
    </div>
    <div>
      <div class="svg number">
        <img src="/legend/forest.svg" alt="" />
        {#if count.get('f') != undefined}
          <span>{count.get('f')}</span>
        {/if}
      </div>
      Wald
    </div>
    <div>
      <div class="svg number">
        <img src="/legend/residential.svg" alt="" />
        {#if count.get('r') != undefined}
          <span>{count.get('r')}</span>
        {/if}
      </div>
      Wohnraum
    </div>
    <div>
      <div class="svg number">
        <img src="/legend/industrial.svg" alt="" />
        {#if count.get('i') != undefined}
          <span style:color="var(--c-black)">{count.get('i')}</span>
        {/if}
      </div>
      Industrie
    </div>
    <div>
      <img src="/legend/channel.svg" alt="" />
      Kanal
    </div>
    <div>
      <img src="/legend/river.svg" alt="" />
      Lech
    </div>
  </div>
</section>

<style lang="sass">
  @import "src/styles/theme"
  p
    font-weight: $fw-semibold
    margin-bottom: 2em

  section
    margin-left: 3rem
    margin-top: -4rem

  .icons
    display: grid
    grid-template-rows: repeat(7, 1fr)
    gap: .5em
    transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)

    div
      display: flex
      align-items: center
      gap:  1rem

    .svg
      position: relative

      span
        position: absolute
        text-align: center
        width: 100%
        font-size: $fs-micro
        color: var(--c-white)
</style>
