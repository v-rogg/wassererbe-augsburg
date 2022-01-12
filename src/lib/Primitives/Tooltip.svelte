<script lang='ts'>
	import { isMobile, showTooltip } from '$lib/../stores';

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
			style='
                top: {y / 16 + 0.5}rem;
                left: {x / 16 + 0.25}rem;'
			class='tooltip'
		>
			<span class='margin-right'>
				{title}
			</span>
			{#if key}
				<span class='hotkey--outer'>
					<span class='hotkey--inner'>
						<span class='hotkey'>
							{#if key.toUpperCase() === 'RIGHT'}
								<svg
									height='1em'
									aria-hidden='true'
									focusable='false'
									data-prefix='fas'
									data-icon='arrow-right'
									class='hotkey--svg svg-inline--fa fa-arrow-right'
									role='img'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
								><path
									fill='currentColor'
									d='M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z'
								/></svg
								>
							{:else if key.toUpperCase() === 'LEFT'}
								<svg
									height='1em'
									aria-hidden='true'
									focusable='false'
									data-prefix='far'
									data-icon='arrow-left'
									class='hotkey--svg svg-inline--fa fa-arrow-left'
									role='img'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
								><path
									fill='currentColor'
									d='M447.1 256c0 13.25-10.76 24.01-24.01 24.01H83.9l132.7 126.6c9.625 9.156 9.969 24.41 .8125 33.94c-9.156 9.594-24.34 9.938-33.94 .8125l-176-168C2.695 268.9 .0078 262.6 .0078 256S2.695 243.2 7.445 238.6l176-168C193 61.51 208.2 61.85 217.4 71.45c9.156 9.5 8.812 24.75-.8125 33.94l-132.7 126.6h340.1C437.2 232 447.1 242.8 447.1 256z'
								/></svg
								>
							{:else}
								{key.toUpperCase()}
							{/if}
						</span>
					</span>
				</span>
			{/if}
		</div>
	{:else}
		<div
			style='
                top: {y / 16 + 0.5}rem;
                right: {innerWidth / 16 - x / 16 - 0.25}rem;'
			class='tooltip'
		>
			{#if key}
				<span class='hotkey--outer'>
					<span class='hotkey--inner'>
						<span class='hotkey'>
							{#if key.toUpperCase() === 'RIGHT'}
								<svg
									height='1em'
									aria-hidden='true'
									focusable='false'
									data-prefix='fas'
									data-icon='arrow-right'
									class='hotkey--svg svg-inline--fa fa-arrow-right'
									role='img'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
								><path
									fill='currentColor'
									d='M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z'
								/></svg
								>
							{:else if key.toUpperCase() === 'LEFT'}
								<svg
									height='1em'
									aria-hidden='true'
									focusable='false'
									data-prefix='far'
									data-icon='arrow-left'
									class='hotkey--svg svg-inline--fa fa-arrow-left'
									role='img'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
								><path
									fill='currentColor'
									d='M447.1 256c0 13.25-10.76 24.01-24.01 24.01H83.9l132.7 126.6c9.625 9.156 9.969 24.41 .8125 33.94c-9.156 9.594-24.34 9.938-33.94 .8125l-176-168C2.695 268.9 .0078 262.6 .0078 256S2.695 243.2 7.445 238.6l176-168C193 61.51 208.2 61.85 217.4 71.45c9.156 9.5 8.812 24.75-.8125 33.94l-132.7 126.6h340.1C437.2 232 447.1 242.8 447.1 256z'
								/></svg
								>
							{:else}
								{key.toUpperCase()}
							{/if}
						</span>
					</span>
				</span>
			{/if}
			<span class='margin-left'>
				{title}
			</span>
		</div>
	{/if}
{/if}

<style lang='sass'>
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

		&--svg
			transform: translateY(1px)
</style>
