<script lang="ts">
  import { playback, year, yearLimits } from "$lib/../stores";
  import { fade } from "svelte/transition";
  import { PlaybackMode } from "$lib/enums";

  const timeDifference = $yearLimits.max - $yearLimits.min;
  const default_duration = 2500;
</script>

<div class="media-controls">
  <button
    disabled={$year === $yearLimits.min}
    on:click={() => {
      $playback = PlaybackMode.FastBackward;
      const duration = (($year - $yearLimits.min) / timeDifference) * default_duration;
      year.update((n) => (n = $yearLimits.min), { duration: duration });
      setTimeout(() => {
        $playback = PlaybackMode.Pause;
      }, duration);
    }}
  >
    <!--Backward-->
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="backward"
      class="svg-inline--fa fa-backward"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      ><path
        fill="currentColor"
        d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"
      /></svg
    >
    <!--    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="backward-step" class="svg-inline&#45;&#45;fa fa-backward-step" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z"/></svg>-->
  </button>
  <button
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
    <!--Play/Pause-->
    {#if $playback == PlaybackMode.Forward || $playback == PlaybackMode.FastForward || $playback == PlaybackMode.FastBackward}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="pause"
        class="svg-inline--fa fa-pause"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        transition:fade={{ duration: 200 }}
      >
        <path
          fill="currentColor"
          d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"
        />
      </svg>
    {:else}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="play"
        class="svg-inline--fa fa-play"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="transform: translateX(-1px)"
        transition:fade={{ duration: 200 }}
      >
        <path
          fill="currentColor"
          d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"
        />
      </svg>
    {/if}
  </button>
  <button
    disabled={$year === $yearLimits.max}
    on:click={() => {
      $playback = PlaybackMode.FastForward;
      const duration = ((timeDifference - ($year - $yearLimits.min)) / timeDifference) * default_duration;
      console.log(duration);
      year.update((n) => (n = $yearLimits.max), {
        duration: duration > 0 ? duration : default_duration,
      });
      setTimeout(() => {
        $playback = PlaybackMode.Pause;
      }, duration);
    }}
  >
    <!--Forward-->
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="forward"
      class="svg-inline--fa fa-forward"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      ><path
        fill="currentColor"
        d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z"
      /></svg
    >
    <!--    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="forward-step" class="svg-inline&#45;&#45;fa fa-forward-step" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"/></svg>-->
  </button>
</div>

<style lang="sass">
  @import "../../styles/theme"

  .media-controls
    display: flex
    align-items: center
    margin-left: 4em

  button
    background: none
    padding: 0
    border: none
    width: 1.5em
    height: 1.5em
    position: relative
    margin: 0 .5em 0 0
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center

    &:hover:not(&:disabled)
      path
        fill: $c-grey-90

    &:active:not(&:disabled)
      path
        fill: $c-blue

    path
      fill: $c-black
      //transition: 200ms fill cubic-bezier(0.645, 0.045, 0.355, 1)

    &:disabled
      cursor: default

      path
        fill: $c-grey-30

  svg
    height: 1.5em
    width: 1.5em
    position: absolute
</style>
