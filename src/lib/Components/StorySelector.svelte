<script lang="ts">
  import { selectedStory, stories, storyDirection, infoMode, displayReference, firstLoad, showHamburger } from "$lib/../stores";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { StoryDirection, InfoMode } from "$lib/enums";
  import Button from "$lib/Primitives/Button.svelte";
  import { sineIn, sineOut } from "svelte/easing";

  let selectedS;
  const unsub = selectedStory.subscribe((x) => (selectedS = x));

  let ready = false;
  onMount(() => {
    ready = true;
  });

  onDestroy(() => {
    unsub();
  });
</script>

{#if ready}
  <section in:fade={{ duration: 1000, delay: $firstLoad ? 4500 : 0, ease: sineOut }} out:fade={{ duration: 500, ease: sineIn }}>
    <p class="description">Erfahre wie sich die Stadt seit Ende der Neuzeit dank intensiver Wassernutzung verändert hat.</p>
    <div>
      <p class="choose">Wähle ein Geschichte</p>
      <nav transition:fade>
        <ul>
          {#each $stories as story, index}
            <li
              on:click={() => {
                if ($selectedStory === index) {
                  $selectedStory = -1;
                  $infoMode = InfoMode.Legend;
                } else {
                  index > $selectedStory ? ($storyDirection = StoryDirection.Down) : ($storyDirection = StoryDirection.Up);
                  $displayReference = false;
                  $selectedStory = index;
                  $infoMode = InfoMode.Story;
                }
                $showHamburger = false;
              }}
            >
              <Button active={$selectedStory === index}>
                <span class="number" class:active={$selectedStory === index}>
                  {index + 1}
                </span>
              </Button>
              <span class:active={$selectedStory === index}>
                {story.name}
              </span>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </section>
{/if}

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

  .description
    width: 80%

    @media (max-width: 1300px), (max-height: 650px)
      width: 100%

  section
    display: grid
    grid-template-rows: 1fr auto 1fr
    height: 90%

    @media (max-width: 1300px), (max-height: 650px)
      height: 100%
      width: 100%

  .choose
    font-weight: $fw-semibold
    margin-bottom: 2em

  nav
    width: 100%
    margin-bottom: 2rem
    padding: 0

    @media (max-width: 1300px), (max-height: 650px)
      font-size: $fs-big

    ul
      list-style: none
      padding: 0
      position: relative

      &:before
        content: ""
        background: var(--c-grey-10)
        height: calc(100% + 1em)
        width: 2rem
        position: absolute
        top: -.5em
        border-radius: $bor-normal

    li
      display: flex
      align-items: center
      gap: 1rem
      margin: .25em 0
      transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)

      @media (max-width: 1300px), (max-height: 650px)
        margin: .75em 0

      &:hover
        cursor: pointer
        font-weight: $fw-semibold

        :global(button)
          background: var(--c-grey-30)

      .active
        font-weight: $fw-semibold
</style>
