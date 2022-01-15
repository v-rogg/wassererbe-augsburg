<script>
  import { createEventDispatcher } from "svelte";
  import { SliderState } from "$lib/enums";
  import Button from "$lib/Primitives/Button.svelte";

  export let title = '';
	export let hotkey = '';
	export let active = false;
  $: state = active ? SliderState.On : SliderState.Off;

	const dispatch = createEventDispatcher();
</script>

<div class="slider">
	<span class:on={state === SliderState.On}>
		<Button
			{title}
			{hotkey}
			on:click={() => {
				switch (state) {
					case SliderState.Off:
						state = SliderState.On;
						dispatch('click', { state });
						break;
					case SliderState.On:
						state = SliderState.Off;
						dispatch('click', { state });
						break;
				}
			}}
		>
			<slot />
		</Button>
	</span>
</div>

<style lang="sass">
	@import "src/styles/theme"

	.slider
		width: 4rem
		height: 2rem
		background: $c-grey-10
		border-radius: $bor-normal
		overflow: hidden

	button
		position: absolute
		border: none
		background: $c-grey-30
		width: 2rem
		height: 2rem
		border-radius: $bor-normal
		display: flex
		justify-content: center
		align-items: center
		font-size: $fs-normal
		color: $c-black
		transition: 400ms transform cubic-bezier(0.645, 0.045, 0.355, 1)

		&:hover
			cursor: pointer
			background: $c-grey-10

		&:active
			background: $c-white


	:global(.on button)
		display: block
		color: $c-white
		transform: translateX(100%)
		background: var(--active)

		&:hover
			color: var(--active)

</style>
