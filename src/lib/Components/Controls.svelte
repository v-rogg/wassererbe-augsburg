<script lang='ts'>
	import Button from '$lib/Primitives/Button.svelte';
	import { yearLimits } from '$lib/../stores';
</script>

<section>
	<Button title='Zu {$yearLimits.max}'>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='backward'
			class='svg-inline--fa fa-backward'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<path
				fill='currentColor'
				d='M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z'
			/>
		</svg
		>
	</Button>

	<Button hotkey='left' title='Vorherige Etappe'>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='backward-step'
			class='svg-inline--fa fa-backward-step'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 320 512'
		>
			<path
				fill='currentColor'
				d='M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z'
			/>
		</svg
		>
	</Button>

	<Button hotkey='Leer' title='Starten'>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='play'
			class='svg-inline--fa fa-play'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<path
				fill='currentColor'
				style='transform: translateX(-3em)'
				d='M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z'
			/>
		</svg
		>
	</Button>

	<Button hotkey='right' title='Nächste Etappe'>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='forward-step'
			class='svg-inline--fa fa-forward-step'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 320 512'
		>
			<path
				fill='currentColor'
				d='M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z'
			/>
		</svg
		>
	</Button>

	<Button
		title="Zu {$yearLimits.max === new Date().getFullYear() ? 'Heute' : $yearLimits.max}"
	>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='forward'
			class='svg-inline--fa fa-forward'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<path
				fill='currentColor'
				d='M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z'
			/>
		</svg
		>
	</Button>

	<Button hotkey='R' title='Referenzkarten'>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='map'
			class='svg-inline--fa fa-map'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 576 512'
		>
			<path
				fill='currentColor'
				d='M384 476.1L192 421.2V35.93L384 90.79V476.1zM416 88.37L543.1 37.53C558.9 31.23 576 42.84 576 59.82V394.6C576 404.4 570 413.2 560.9 416.9L416 474.8V88.37zM15.09 95.13L160 37.17V423.6L32.91 474.5C17.15 480.8 0 469.2 0 452.2V117.4C0 107.6 5.975 98.78 15.09 95.13V95.13z'
			/>
		</svg
		>
	</Button>

	<Button hotkey='L' title='Legende' active={false}>
		<svg
			height='1em'
			aria-hidden='true'
			focusable='false'
			data-prefix='fas'
			data-icon='hexagon'
			class='svg-inline--fa fa-hexagon'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<path
				fill='currentColor'
				d='M505.8 278.6l-105.4 179.2C392.3 471.5 377.5 480 361.4 480H150.6c-16.11 0-30.93-8.516-39.05-22.17l-105.4-179.2c-8.234-14-8.234-31.27 0-45.27l105.4-179.2C119.7 40.52 134.5 32 150.6 32h210.8c16.11 0 30.93 8.516 39.05 22.16l105.4 179.2C514.1 247.4 514.1 264.6 505.8 278.6z'
			/>
		</svg
		>
	</Button>
</section>

<style lang='sass'>
	section
		display: flex
		justify-content: space-between
		gap: 1rem
		width: 100%
</style>
