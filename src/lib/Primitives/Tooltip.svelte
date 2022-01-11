<script lang="ts">
	import { showTooltip, isMobile } from '$lib/../stores';

	export let title;
	export let x;
	export let y;
	export let key;

	let innerWidth = 0;

	$: right = x < innerWidth - innerWidth / 3;
</script>

<svelte:window bind:innerWidth />

{#if $showTooltip && !$isMobile}
	{#if right}
		<div
			style="
                top: {y / 16 + 0.5}rem;
                left: {x / 16 + 0.25}rem;"
			class="tooltip"
		>
			<i class="far fa-info-circle margin-right" />
			<span class="margin-right">
				{title}
			</span>
			{#if key}
				<span class="hotkey--outer">
					<span class="hotkey--inner">
						<span class="hotkey">
							{key.toUpperCase()}
						</span>
					</span>
				</span>
			{/if}
		</div>
	{:else}
		<div
			style="
                top: {y / 16 + 0.5}rem;
                right: {innerWidth / 16 - x / 16 - 0.25}rem;"
			class="tooltip"
		>
			{#if key}
				<span class="hotkey--outer">
					<span class="hotkey--inner">
						<span class="hotkey">
							{key.toUpperCase()}
						</span>
					</span>
				</span>
			{/if}
			<span class="margin-left">
				{title}
			</span>
			<i class="far fa-info-circle margin-left" />
		</div>
	{/if}
{/if}

<style lang="sass">
  @import "src/styles/theme"

  .tooltip
    background: $c-grey-30
    border-radius: $bor-normal
    padding: .5rem .75rem
    position: absolute
    pointer-events: none
    font-size: .85rem
    overflow: hidden
    animation: show 0s 1s forwards
    opacity: 0

  @keyframes show
    to
      opacity: 1

  .margin-right
    margin-right: .5rem
  .margin-left
    margin-left: .5rem

  .hotkey
    display: inline-flex
    justify-content: center
    align-items: center
    margin: 6px
    font-size: .6875rem
    position: relative
    transform: translateY(-1px)

    &--outer
      border-radius: $bor-normal
      border: .75px solid $c-black
      padding: 3px 3px 4px 3px

    &--inner
      margin: 2px 0 4px 0
      border-radius: $bor-normal
      border: .75px solid $c-black
</style>
