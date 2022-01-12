<script lang="ts">
	import { tooltip } from '$lib/Actions/tooltip';
	import { hotkey as hotkeyAction } from '$lib/Actions/hotkeys';
	import { createEventDispatcher } from 'svelte';

	export let active: boolean = true;
	export let title: string = '';
	export let hotkey: string = '';
	export let disabled: boolean = false;
	export let danger: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div class="ui-button">
	<button
		class:active
		{title}
		{hotkey}
		use:hotkeyAction
		use:tooltip
		{disabled}
		on:click={() => {
			dispatch('click');
		}}
	>
		<span class="main event-none">
			<slot />
		</span>

		{#if $$slots.addon}
			<span class="addon event-none">
				<slot name="addon" />
			</span>
		{/if}

		{#if disabled}
			<span class="lock event-none" class:hidden={!disabled}>
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="lock"
					class="svg-inline--fa fa-lock"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					><path
						fill="currentColor"
						d="M384 223.1L368 224V144c0-79.41-64.59-144-144-144S80 64.59 80 144V224L64 223.1c-35.35 0-64 28.65-64 64v160c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64v-160C448 252.7 419.3 223.1 384 223.1zM144 144C144 99.88 179.9 64 224 64s80 35.88 80 80V224h-160V144z"
					/></svg
				>
			</span>
		{/if}

		{#if danger}
			<span class="danger event-none" class:hidden={!danger}>
				<svg
					height="1em"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="triangle-exclamation"
					class="svg-inline--fa fa-triangle-exclamation"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
					/></svg
				>
			</span>
		{/if}
	</button>
</div>

<style lang="sass">
  @import "./src/styles/theme"

  .ui-button
    position: relative

  button
    border: none
    background: $c-grey-30
    width: 2rem
    height: 2rem
    font-size: $fs-normal
    display: flex
    justify-content: center
    align-items: center
    border-radius: $bor-normal
    color: $c-black
    position: relative
    outline: none

    &:hover:not(.open):not(:disabled)
      cursor: pointer

    &:active:not(.open):not(:disabled)
      background: $c-grey-10
      color: $c-grey-90

      path
        fill: $c-black

  .active
    background: var(--active)
    color: $c-white

    //path
      //fill: $c-white

  .main
    display: flex
    justify-content: center
    align-items: center

  .lock, .danger
    position: absolute
    bottom: .25rem
    right: .25rem
    font-size: .85rem

  .lock
    color: $c-black

  .danger
    color: $c-red

  .addon
    position: absolute
    font-size: .85rem
    top: .25rem
    right: .5rem
</style>
