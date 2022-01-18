<script lang="ts">
  import Legend from "$lib/Components/Legend.svelte";
  import Story from "$lib/Components/Story.svelte";
  import { selectedStory } from "../stores";
</script>

{#if $selectedStory < 0}
  <Legend/>
{/if}

{#if $selectedStory >= 0}
  <Story/>
{/if}
