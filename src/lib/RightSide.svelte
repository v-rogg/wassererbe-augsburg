<script lang="ts">
  import Legend from "$lib/Components/Legend.svelte";
  import Story from "$lib/Components/Story.svelte";
  import { infoMode, firstLoad } from "../stores";
  import { InfoMode } from "$lib/enums";
  import { fade } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
  import { onMount } from "svelte";

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

{#if ready}
  <section in:fade={{ duration: 1000, delay: $firstLoad ? 4500 : 0, ease: sineOut }} out:fade={{ duration: 500, ease: sineIn }}>
    {#if $infoMode === InfoMode.Legend}
      <Legend />
    {:else if $infoMode === InfoMode.Story}
      <Story />
    {/if}
  </section>
{/if}

<style lang="sass">
  section
    width: 100%
    height: 100%
    display: flex
    align-items: center
    position: relative
</style>
