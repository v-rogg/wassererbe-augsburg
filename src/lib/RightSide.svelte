<script lang="ts">
  import Legend from "$lib/Components/Legend.svelte";
  import Story from "$lib/Components/Story.svelte";
  import { infoMode } from "../stores";
  import { InfoMode } from "$lib/enums";
</script>

<section>
  {#if $infoMode === InfoMode.Legend}
    <Legend/>
  {:else if $infoMode === InfoMode.Story}
    <Story/>
  {/if}
</section>

<style lang="sass">
  section
    width: 100%
    height: 100%
    display: flex
    align-items: center
    position: relative
</style>
