<script lang="ts">
  import { fly } from "svelte/transition";
  import { storyDirection, stories, selectedStory } from "../../stores";
  import { StoryDirection } from "$lib/enums";
  import { sineIn, sineOut } from "svelte/easing";

  const movementAmount = 100;

  function checkDirectionIn() {
    return $storyDirection === StoryDirection.Down ? movementAmount / 2 : -movementAmount / 2;
  }

  function checkDirectionOut() {
    return $storyDirection === StoryDirection.Down ? -movementAmount : movementAmount;
  }
</script>
<section transition:fly={{ duration: 200, x: 10 }}>
  {#each $stories as story, index}
    {#if $selectedStory === index}
      <div class="story"
           in:fly={{
              duration: 900,
              y: checkDirectionIn(),
              delay: 400,
              easing: sineOut,
              opacity: -0.2
            }}
           out:fly={{ duration: 600, y: checkDirectionOut(), easing: sineIn, opacity: -0.5 }}
      >
        <h3>
          {story.name}
        </h3>
        {#each story.usage as usage}
          <p>
            {@html usage.description}
          </p>
        {/each}
      </div>
    {/if}
  {/each}
</section>

<style lang="sass">
  section
    margin-left: 3rem
    margin-top: calc(100%)
    height: 100%
    width: 100%
    position: relative

  .story
    position: absolute
    height: 100%
    width: 100%
</style>
