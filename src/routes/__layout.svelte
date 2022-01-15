<script lang="ts">
  import { DisplayMode } from "$lib/enums";
  import { mode } from "../stores";
</script>

<svelte:head>
  {#if $mode === DisplayMode.Map}
    <link rel="icon" href="favicon.svg" />
  {:else if $mode === DisplayMode.Percent}
    <link rel="icon" href="favicon-green.svg" />
  {/if}
</svelte:head>

<slot/>
