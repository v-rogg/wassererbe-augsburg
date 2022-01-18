<script lang="ts">
  import { selectedStory, stories, selectedEoI } from "$lib/../stores";
</script>

<nav class:moved={$selectedStory >= 0}>
  <h2>Wähle eine Geschichte</h2>
  {#if $stories.length > 0}
    {#each $stories as story, index}
      <h3>
        <button
          on:click={() => {
            $selectedStory = index;
            $selectedEoI = 0;
          }}
          disabled={index === $selectedStory}
          class="story-selector"
          class:noneSelected={$selectedStory < 0}
        >
          {#if story.shape === "circle"}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DAEACD" />
            </svg>
          {:else if story.shape === "square"}
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="31" height="30" rx="4" fill="#CBE6F8" />
            </svg>
          {:else if story.shape === "triangle"}
            <svg
              width="34"
              height="30"
              viewBox="0 0 34 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="transform: translateX(-2px)"
            >
              <path
                d="M13.5561 2.82943C15.1042 0.208871 18.8957 0.208876 20.4439 2.82944L32.4874 23.2154C34.0627 25.8819 32.1406 29.25 29.0435 29.25H4.95641C1.85939 29.25 -0.0627815 25.8819 1.51251 23.2154L13.5561 2.82943Z"
                fill="#D9D9D9"
              />
            </svg>
          {/if}
          <div>
            {story.name}
          </div>
        </button>
      </h3>
    {/each}
  {/if}
</nav>

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

  h2
    font-weight: $fw-bold
    font-size: 1rem
    line-height: 1
    margin: 0 0 1.5em 0
    padding: 0

  h3
    font-size: 1rem
    line-height: 1
    margin: 0
    padding: 0

  .story-selector
    display: grid
    grid-template-columns: 50px auto
    align-items: center
    font-size: 1.5rem
    font-family: "IBM Plex Sans", sans-serif
    background: none
    border: none
    padding: 0
    margin: 0 0 .5em 0
    color: $c-grey-30

    &:disabled
      font-weight: $fw-medium
      color: $c-black

    &:hover:not(&:disabled)
      cursor: pointer
      color: $c-black

    svg
      height: 30px
      width: auto

  nav
    position: absolute
    top: 350px
    left: 50%
    transition: 400ms cubic-bezier(0.645, 0.045, 0.355, 1)
    transform: translate(-50%, -50%)
    width: $p-side-content-width

  .moved
    top: 125px
    transform: translate(-50%, 0)

  .noneSelected
    color: $c-black !important
</style>
