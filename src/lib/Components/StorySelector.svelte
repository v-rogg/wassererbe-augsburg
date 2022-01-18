<script lang="ts">
  import { selectedStory, stories, storyDirection } from "$lib/../stores";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { StoryDirection } from "$lib/enums";
  import Button from "$lib/Primitives/Button.svelte";

  let selectedS;
  const unsub = selectedStory.subscribe((x) => (selectedS = x));

  onDestroy(() => {
    unsub();
  });
</script>

<section>
<!--  <p class="description">-->
<!--    Erfahre wie sich die Stadt seit Ende der Neuzeit dank intensiver Wassernutzung verändert hat.-->
<!--  </p>-->
  <p class="choose">
    Wähle ein Geschichte
  </p>
  <menu transition:fade={{ delay: 400 }}>
    <ul>
      {#each $stories as story, index}
        <li on:click={() => {
          if ($selectedStory === index) {
            $selectedStory = -1
          } else {
            index > $selectedStory
								? ($storyDirection = StoryDirection.Down)
								: ($storyDirection = StoryDirection.Up);
            $selectedStory = index
          }
        }}>
          <Button
            active={$selectedStory === index}>
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
  </menu>
</section>

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

  .description
    position: absolute
    top: 2rem
    width: 80%

  .choose
    font-weight: $fw-semibold
    margin-bottom: 2em

  menu
    width: 100%
    margin-bottom: 4rem
    padding: 0

    ul
      list-style: none
      padding: 0
      position: relative

      &:before
        content: ""
        background: var(--c-grey-10)
        height: calc(100% + 1em)
        width: 32px
        position: absolute
        top: -.5em
        border-radius: $bor-normal

    li
      display: flex
      align-items: center
      gap: 1rem
      margin: .25em 0
      transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)

      &:hover
        cursor: pointer
        font-weight: $fw-semibold

        :global(button)
          background: var(--c-grey-30)

      .active
        font-weight: $fw-semibold
</style>
