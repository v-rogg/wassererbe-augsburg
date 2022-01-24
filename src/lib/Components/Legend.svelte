<script lang="ts">
  import { fly } from "svelte/transition";
  import { countTotal, isMobile } from "../../stores";
  import { onDestroy } from "svelte";
  import { sineIn, sineOut } from "svelte/easing";

  let count = new Map();
  const unsubCountTotal = countTotal.subscribe((x) => (count = x));

  onDestroy(() => {
    unsubCountTotal;
  });
</script>

<div class="legend" in:fly={{ duration: 600, x: 30, ease: sineOut }} out:fly={{ duration: 600, x: 30, ease: sineIn }}>
  <div>
    <p>Nutzung der Zonen</p>
    <div class="icons">
      <div>
        <div class="svg number">
          <img width="44" height="44" src="/legend/agricultural.svg" alt="" />
          {#if count.get("a") !== undefined}
            <span>{count.get("a")}</span>
          {/if}
        </div>
        Landwirtschaft
      </div>
      <div>
        <div class="svg number">
          <img width="44" height="44" src="/legend/grassland.svg" alt="" />
          {#if count.get("g") !== undefined}
            <span>{count.get("g")}</span>
          {/if}
        </div>
        Grasland
      </div>
      <div>
        <div class="svg number">
          <img width="44" height="44" src="/legend/forest.svg" alt="" />
          {#if count.get("f") !== undefined}
            <span>{count.get("f")}</span>
          {/if}
        </div>
        Wald
      </div>
      <div>
        <div class="svg number">
          <img width="44" height="44" src="/legend/residential.svg" alt="" />
          {#if count.get("r") !== undefined}
            <span>{count.get("r")}</span>
          {/if}
        </div>
        Wohnraum
      </div>
      <div>
        <div class="svg number">
          <img width="44" height="44" src="/legend/industrial.svg" alt="" />
          {#if count.get("i") !== undefined}
            <span>{count.get("i")}</span>
          {/if}
        </div>
        Industrie
      </div>
      {#if !isMobile}
      <div>
        <img width="44" height="10" src="/legend/river.svg" alt="" />
        Lech
      </div>
      <div>
        <img width="44" height="5" src="/legend/channel.svg" alt="" />
        Kanal
      </div>
      {/if}
    </div>
  </div>
</div>

<style lang="sass">
  @import "src/styles/theme"
  p
    font-weight: $fw-semibold
    margin-bottom: 1.5em
    font-size: $fs-small

  .legend
    position: absolute
    display: flex
    justify-content: center
    margin-bottom: 3rem
    //width: 80%
    width: 100%
    height: max-content

    @media (max-width: 1300px), (max-height: 650px)
      margin-bottom: 0

  .icons
    display: grid
    grid-template-rows: repeat(7, 1fr)
    gap: .5em
    transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)

    @media (max-width: 1300px), (max-height: 650px)
      grid-template-rows: repeat(5, 1fr)
      gap: 0

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
        font-size: $fs-small
        color: $c-white
</style>
