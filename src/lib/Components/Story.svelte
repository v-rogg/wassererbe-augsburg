<script lang="ts">
  import { fly } from "svelte/transition";
  import { storyDirection, stories, selectedStory, infoMode, countRegion } from "../../stores";
  import { StoryDirection, InfoMode } from "$lib/enums";
  import { sineIn, sineOut } from "svelte/easing";

  const movementAmount = 100;

  function checkDirectionIn() {
    return $storyDirection === StoryDirection.Down ? movementAmount / 2 : -movementAmount / 2;
  }

  function checkDirectionOut() {
    return $storyDirection === StoryDirection.Down ? -movementAmount : movementAmount;
  }
</script>

<div class="stories" transition:fly={{ duration: 200, x: 10 }}>
  {#each $stories as story, index}
    {#if $selectedStory === index}
      <div
        class="story"
        in:fly={{
          duration: 900,
          y: checkDirectionIn(),
          delay: $infoMode === InfoMode.Story ? 400 : 0,
          easing: sineOut,
          opacity: -0.2,
        }}
        out:fly={{
          duration: 600,
          y: checkDirectionOut(),
          easing: sineIn,
          opacity: -0.5,
        }}
      >
        <div class="header">
          <div class="index number">
            {index + 1}
          </div>
          <h3>
            {story.name}
          </h3>
        </div>
        <div class="text">
          {#each story.usage as usage}
            <p class={usage.usage}>
              {@html usage.description}
            </p>
          {/each}
        </div>
        <div class="zoneCounter">
          <div class="zoneCounter--header">
            <span class="number">{story.zones.length}</span> beeinflusste Zonen
          </div>
          <div class="zoneCounter--table">
            <div class="agricultural">
              <div class="svg number">
                <img src="/legend/agricultural.svg" height="20px" width="auto" alt="" />
                {#if $countRegion.get("a") !== undefined}
                  <span>{$countRegion.get("a")}</span>
                {/if}
              </div>
              Landwirtschaft
            </div>
            <div class="grassland">
              <div class="svg number">
                <img src="/legend/grassland.svg" height="20px" width="auto" alt="" />
                {#if $countRegion.get("g") !== undefined}
                  <span>{$countRegion.get("g")}</span>
                {/if}
              </div>
              Grasland
            </div>
            <div class="forest">
              <div class="svg number">
                <img src="/legend/forest.svg" height="20px" width="auto" alt="" />
                {#if $countRegion.get("f") !== undefined}
                  <span>{$countRegion.get("f")}</span>
                {/if}
              </div>
              Wald
            </div>
            <div class="residential">
              <div class="svg number">
                <img src="/legend/residential.svg" height="20px" width="auto" alt="" />
                {#if $countRegion.get("r") !== undefined}
                  <span>{$countRegion.get("r")}</span>
                {/if}
              </div>
              Wohnraum
            </div>
            <div class="industrial">
              <div class="svg number">
                <img src="/legend/industrial.svg" height="20px" width="auto" alt="" />
                {#if $countRegion.get("i") !== undefined}
                  <span>{$countRegion.get("i")}</span>
                {/if}
              </div>
              Industrie
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style lang="sass">
  @import "src/styles/theme"

  .stories
    height: 100%
    position: absolute
    display: flex
    justify-content: flex-end
    //margin-bottom: 3rem
    width: 100%

  .zoneCounter
    //flex-grow: 2
    //max-height: 260px
    //height: 260px
    margin-top: 2rem

    &--header
      font-size: $fs-medium
      font-weight: $fw-regular

    &--table
      display: grid
      grid-template-rows: repeat(5, 1fr)
      gap: .25em
      margin-top: 1rem
      max-height: max-content
      transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)

      div
        display: flex
        align-items: center
        gap: 40px
        //color: var(--c-black)

      .svg
        position: relative

        span
          position: absolute
          right: -26px
          text-align: left
          width: 100%
          display: flex
          align-items: center
          font-size: $fs-small

      .agricultural
          color: $c-agricultural
      .grassland
          color: $c-grassland
      .residential
        color: $c-residential
      .industrial
        color: $c-industrial
      .forest
        color: $c-forest

  .story
    position: absolute
    display: flex
    flex-direction: column
    justify-content: center
    height: 100%
    max-height: 100%
    width: 90%

    @media (max-width: 1300px), (max-height: 650px)
      display: block
      width: 100%

  .index
    background: var(--active)
    width: 2rem
    height: 2rem
    font-size: $fs-normal
    font-weight: $fw-semibold
    border-radius: $bor-normal
    display: flex
    justify-content: center
    align-items: center
    position: relative
    color: $c-white
    flex-shrink: 0

  h3
    padding: 0
    margin: .5rem 0 1.5rem
    font-size: $fs-big

  .text
    overflow-y: auto
    scrollbar-width: thin
    scrollbar-color: var(--c-grey-30) var(--c-grey-10)
    scrollbar-gutter: stable

    @media (max-width: 1300px), (max-height: 650px)
      overflow-y: visible

    &::-webkit-scrollbar
      width: 4px

    &::-webkit-scrollbar-track
      background-color: var(--c-grey-10)

    &::-webkit-scrollbar-thumb
      height: 30px
      background-color: var(--c-grey-30)


  p
    width: calc(100% - 2rem)
    margin: 2px 0
    padding: .5rem 1rem .5rem 1rem
    position: relative
    flex-shrink: 1

    &:before
      content: ""
      width: 4px
      height: 100%
      left: 0
      top: 0
      background: var(--c-grey-30)
      display: block
      position: absolute
      border-radius: $bor-small

    &:first-of-type
      margin-top: 0
      padding-top: 0

    &:last-of-type
      margin-bottom: 0
      padding-bottom: 0
</style>
