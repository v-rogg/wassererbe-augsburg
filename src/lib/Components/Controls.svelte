<script lang="ts">
  import Button from "$lib/Primitives/Button.svelte";
  import Slider from "$lib/Primitives/Slider.svelte";
  import { playback, year, yearLimits, mode, infoMode, displayReference } from "$lib/../stores";
  import { PlaybackMode, DisplayMode, InfoMode } from "$lib/enums.ts";
  import { goto } from "$lib/actions/helpers";
  import { fade } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
  import { onMount } from "svelte";

  const default_duration = 2500;

  let ready = false;
  onMount(() => {ready = true})
</script>

{#if ready}
<section  in:fade={{ duration: 1000, delay: 4500, ease: sineOut }} out:fade={{ duration: 500, ease: sineIn }}>
  <div class="slider">
    <Slider
      title="%-Ansicht"
      hotkey="a"
      on:click={(e) => {
				$mode = e.detail.state;
			}}
      active={$mode === DisplayMode.Percent}
    >
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="percent"
        class="svg-inline--fa fa-percent"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M374.6 73.39c-12.5-12.5-32.75-12.5-45.25 0l-320 320c-12.5 12.5-12.5 32.75 0 45.25C15.63 444.9 23.81 448 32 448s16.38-3.125 22.62-9.375l320-320C387.1 106.1 387.1 85.89 374.6 73.39zM64 192c35.3 0 64-28.72 64-64S99.3 64.01 64 64.01S0 92.73 0 128S28.7 192 64 192zM320 320c-35.3 0-64 28.72-64 64s28.7 64 64 64s64-28.72 64-64S355.3 320 320 320z"
        />
      </svg
      >
    </Slider>
  </div>

  <div class="media">
    <Button
      title="Zu {$yearLimits.min}"
      active={$playback === PlaybackMode.FastBackward}
      disabled={$year === $yearLimits.min}
      on:click={() => {
				goto($yearLimits.min);
			}}
    >
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="backward"
        class="svg-inline--fa fa-backward"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"
        />
      </svg>
    </Button>

    <Button hotkey="left" title="Vorherige Etappe" active={$playback === PlaybackMode.StepBackward}>
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="backward-step"
        class="svg-inline--fa fa-backward-step"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z"
        />
      </svg>
    </Button>

    <Button
      hotkey="Space"
      title="Starten"
      active={$playback === PlaybackMode.Forward}
      on:click={() => {
				switch ($playback) {
					case PlaybackMode.Pause:
						if ($year >= $yearLimits.max) {
							$playback = PlaybackMode.FastBackward;
							year.update((n) => (n = $yearLimits.min + 1), { duration: default_duration });
							setTimeout(() => {
								$playback = PlaybackMode.Forward;
							}, default_duration);
						} else $playback = PlaybackMode.Forward;
						break;
					case PlaybackMode.Forward:
						$playback = PlaybackMode.Pause;
						break;
					case PlaybackMode.Backward:
						break;
					case PlaybackMode.FastForward:
						$playback = PlaybackMode.Pause;
						year.update((n) => (n = $year), { duration: 0 });
						break;
					case PlaybackMode.FastBackward:
						$playback = PlaybackMode.Pause;
						year.update((n) => (n = $year), { duration: 0 });
						break;
				}
			}}
    >
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="play"
        class="svg-inline--fa fa-play"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="transform: translateX(-1px)"
      >
        <path
          fill="currentColor"
          d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"
        />
      </svg>
    </Button>

    <Button hotkey="right" title="Nächste Etappe" active={$playback === PlaybackMode.StepForward}>
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="forward-step"
        class="svg-inline--fa fa-forward-step"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"
        />
      </svg>
    </Button>

    <Button
      title="Zu {$yearLimits.max === new Date().getFullYear() ? 'Heute' : $yearLimits.max}"
      active={$playback === PlaybackMode.FastForward}
      disabled={$year === $yearLimits.max}
      on:click={() => {
				goto($yearLimits.max);
			}}
    >
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="forward"
        class="svg-inline--fa fa-forward"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z"
        />
      </svg>
    </Button>
  </div>

  <div class="legend">
    <Button hotkey="R" title="Referenzkarten" active={$displayReference}
      on:click={() => {
        $displayReference = !$displayReference
      }}
    >
      <svg height="1em"
           aria-hidden="true" focusable="false" data-prefix="fas" data-icon="signs-post"
           class="svg-inline--fa fa-signs-post" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor"
              d="M223.1 32C223.1 14.33 238.3 0 255.1 0C273.7 0 288 14.33 288 32H441.4C445.6 32 449.7 33.69 452.7 36.69L500.7 84.69C506.9 90.93 506.9 101.1 500.7 107.3L452.7 155.3C449.7 158.3 445.6 160 441.4 160H63.1C46.33 160 31.1 145.7 31.1 128V64C31.1 46.33 46.33 32 63.1 32L223.1 32zM480 320C480 337.7 465.7 352 448 352H70.63C66.38 352 62.31 350.3 59.31 347.3L11.31 299.3C5.065 293.1 5.065 282.9 11.31 276.7L59.31 228.7C62.31 225.7 66.38 223.1 70.63 223.1H223.1V191.1H288V223.1H448C465.7 223.1 480 238.3 480 255.1V320zM255.1 512C238.3 512 223.1 497.7 223.1 480V384H288V480C288 497.7 273.7 512 255.1 512z"></path>
      </svg>
    </Button>

    <Button hotkey="L" title="Legende" active={$infoMode === InfoMode.Legend}
      on:click={() => {
        if ($infoMode === InfoMode.Story ) {
          $infoMode = InfoMode.Legend
        } else {
          $infoMode = InfoMode.Story
        }
      }}
    >
      <svg
        height="1em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="hexagon"
        class="svg-inline--fa fa-hexagon"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M505.8 278.6l-105.4 179.2C392.3 471.5 377.5 480 361.4 480H150.6c-16.11 0-30.93-8.516-39.05-22.17l-105.4-179.2c-8.234-14-8.234-31.27 0-45.27l105.4-179.2C119.7 40.52 134.5 32 150.6 32h210.8c16.11 0 30.93 8.516 39.05 22.16l105.4 179.2C514.1 247.4 514.1 264.6 505.8 278.6z"
        />
      </svg>
    </Button>
  </div>

  <div class="north">
    <span> N </span>
    <svg
      height="1em"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="location-arrow"
      class="svg-inline--fa fa-location-arrow"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M285.6 444.1C279.8 458.3 264.8 466.3 249.8 463.4C234.8 460.4 223.1 447.3 223.1 432V256H47.1C32.71 256 19.55 245.2 16.6 230.2C13.65 215.2 21.73 200.2 35.88 194.4L387.9 50.38C399.8 45.5 413.5 48.26 422.6 57.37C431.7 66.49 434.5 80.19 429.6 92.12L285.6 444.1z"
      />
    </svg
    >
  </div>
</section>
{/if}

<style lang="sass">
  @import "src/styles/theme"

  section
    display: grid
    grid-template-columns: 10% 15% auto calc(25% - 3em) 3em
    justify-content: space-between
    width: 100%

  .slider
    display: flex
    grid-area: 1/1/2/3

  .media
    display: flex
    background: var(--c-grey-10)
    border-radius: $bor-normal
    grid-area: 1/3/2/4
    gap: .25rem
    position: relative

    &:before
      content: ""
      background: var(--c-grey-10)
      width: 100%
      height: 2rem
      position: absolute
      border-radius: $bor-normal

  .legend
    display: flex
    gap: 16px
    grid-area: 1/4/2/5
    width: 100%
    justify-content: end

  .north
    display: flex
    align-items: center
    justify-content: end
    font-size: $fs-micro
    color: var(--c-black)

    span
      margin-right: 4px

    svg
      transform: rotate(45deg)
</style>
