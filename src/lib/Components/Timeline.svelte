<script lang="ts">
  import { playback, year, yearChanges, yearLimits } from "../../stores";
  import { PlaybackMode } from "$lib/enums";
  import { _, goto } from "$lib/actions/helpers";
  import { onMount } from "svelte";

  const timeDifference = $yearLimits.max - $yearLimits.min;
  let displayYears = [];
  for (let i = 0; i < timeDifference; i += 100) {
    let y = Math.ceil(($yearLimits.min + i) / 100) * 100;
    if (y != $yearLimits.max && y != $yearLimits.min) {
      displayYears.push(y);
    }
  }

  let mouseX = 0;
  let timelineWidth: number = null;
  let dragging = false;

  let offsetYears = 0;

  onMount(() => {
    window.addEventListener("mousedown", (e) => {
      mouseX = e.clientX;
      timelineWidth = _(".bar").offsetWidth;
    });

    window.addEventListener("mousemove", (e) => {
      if (dragging) {
        let offset = e.clientX - mouseX;
        let offsetRelative = offset / timelineWidth;
        offsetYears = offsetRelative * timeDifference;
        if ($year + offsetYears > $yearLimits.min && $year + offsetYears < $yearLimits.max) {
          let yearOffset = $year + offsetYears;
          year.update((n) => (n = yearOffset), { duration: 0 });
          mouseX = e.clientX;
        } else if ($year + offsetYears < $yearLimits.min) {
          year.update((n) => (n = $yearLimits.min), { duration: 0 });
        } else if ($year + offsetYears > $yearLimits.max) {
          year.update((n) => (n = $yearLimits.max), { duration: 0 });
        }
      }
    });

    window.addEventListener("mouseup", () => {
      dragging = false;
      document.body.style.userSelect = null;
    });
  });
</script>

<div class="timeline">
  <!--Timeline and Arrow  -->
  <div class="stroked_bar">
    <svg width="100%" height="100%" viewBox="0 0 100 2" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve"
         style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <path d="M0,1L100,1" style="fill:none;stroke:currentColor;stroke-width:2px;" />
    </svg>
  </div>
  <div class="bar" />
  <svg
    viewBox="0 0 8 14"
    fill="none"
    class="arrow"
    class:arrow--big={$year === $yearLimits.max}
    on:click={() => {goto($yearLimits.max);}}
  >
    <path d="M1 1L6 7L1 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>

  <div class="displayYear removeLine number">
    1500
  </div>

  <!--Min Year  -->
  <div class="yearLimitMin displayYear number">
    {$yearLimits.min}
  </div>

  <!--Max Year-->
  <div class="yearLimitMax displayYear removeLine">
    {$yearLimits.max === new Date().getFullYear() ? 'Heute' : $yearLimits.max}
  </div>

  <!--Every Century-->
  {#each displayYears as year}
    <div
      class="displayYear number"
      style="left: {18 + (((year - $yearLimits.min) / timeDifference) * 82)}%"
    >
      {year}
    </div>
  {/each}

  <!--Current Year-->
  <div
    class="displayYear currentYear number"
    style="left: {18 + ((($year - $yearLimits.min) / timeDifference) * 82)}%"
    class:removeLine={18 + ((($year - $yearLimits.min) / timeDifference) * 82) > 99.5}
    on:mousedown={() => {
      dragging = true;
      document.body.style.userSelect = 'none';
    }}
  >
    {Math.floor($year)}

    {#if $playback === PlaybackMode.FastForward}
      <span class="currentPlaybackMode forward">
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
        ><path
          fill="currentColor"
          d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z"
        /></svg
        >
      </span>
    {:else if $playback === PlaybackMode.StepForward}
      <span class="currentPlaybackMode forward">
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
        ><path
          fill="currentColor"
          d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"
        /></svg
        >
      </span>
    {:else if $playback === PlaybackMode.Forward}
      <span class="currentPlaybackMode forward">
        <svg
          height="1em"
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="play"
          class="svg-inline--fa fa-play"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        ><g class="fa-duotone-group"
        ><path class="fa-secondary" fill="currentColor" d="" /><path
          class="fa-primary"
          fill="currentColor"
          d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"
        /></g
        ></svg
        >
      </span>
    {:else if $playback === PlaybackMode.StepBackward}
      <span class="currentPlaybackMode backward">
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
        ><path
          fill="currentColor"
          d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z"
        /></svg
        >
      </span>
    {:else if $playback === PlaybackMode.FastBackward}
      <span class="currentPlaybackMode backward">
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
        ><path
          fill="currentColor"
          d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"
        /></svg
        >
      </span>
    {/if}
  </div>

  <!-- Year Array  -->
  {#each $yearChanges as y}
    {#if y !== $yearLimits.max}
      <div
        class="displayYear yearChanges"
        style="left: {18 + (((y - $yearLimits.min) / timeDifference) * 82)}%; transform: {y ===
				$yearLimits.min
					? 'translate(calc(-50%), 0)'
					: 'translate(-50%, 0)'}"
        class:yearChanges--big={$year === y}
        on:click={() => {goto(y); console.log(y)}}
      ><span>{y}</span></div>
    {/if}
  {/each}

  <div class="reference_description">
    Vorhandene Referenzkarten
  </div>
</div>
{#if dragging}
  <div class="grabboard" />
{/if}

<style lang="sass">
  @import "src/styles/theme"
  @import "src/styles/variables"

  .timeline
    display: flex
    align-items: center
    position: relative
    height: 100%
    width: 100%
    color: var(--c-black)

  .stroked_bar
    //border: 1px dashed currentColor
    position: absolute
    width: 18%
    border-radius: 2px
    color: var(--c-black)
    height: 2px

    svg
      position: absolute
      top: 0
      width: 100%
      height: 100%

      path
        stroke-dasharray: 3, 4

  .bar
    position: absolute
    left: 18%
    width: 82%
    height: 2px
    border-radius: 2px
    color: var(--c-black)
    background: currentColor

  .arrow
    position: absolute
    right: 0
    transform: translateX(3px)
    transition: 100ms cubic-bezier(0.645, 0.045, 0.355, 1)
    height: 14px

    &:hover
      height: 20px
      cursor: pointer

    &:active
      height: 16px

    &--big
      height: 20px


  .displayYear
    position: absolute
    font-size: .875em
    transform: translate(-50%, 1.75em)
    transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
    transition-delay: 200ms

    &:before
      content: ""
      color: var(--c-black)
      background: currentColor
      width: 1px
      height: calc(1.75em - 10px)
      position: absolute
      left: 50%
      top: calc(-100% + .2em)
      transform: translateX(-50%)
      transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
      transition-delay: 200ms

  .yearLimitMax
    right: 0
    transform: translate(50%, 1.75em) !important

  .yearLimitMin
    left: 18%
    transform: translate(calc(-50% - 1px), 1.75em) !important

  .currentYear
    transform: translate(-50%, -1.5em)
    font-size: 1.125em
    font-weight: $fw-bold
    transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
    transition-delay: 200ms
    transition-property: transform

    &:hover:not(&:active)
      cursor: grab

    &:before
      width: 2px
      top: auto
      height: calc(1.5em - 13px)
      bottom: calc(-100% + 8px)
      transition: 200ms cubic-bezier(0.645, 0.045, 0.355, 1)
      transition-delay: 200ms
      transition-property: height, bottom

  .currentPlaybackMode
    position: absolute
    font-size: $fs-micro
    display: flex
    align-items: center
    height: 100%
    top: -1px

  .forward
    right: -1.5em

  .backward
    left: -1.5em

  .removeLine
    &:before
      opacity: 0

  .yearChanges
    transform: translate(calc(-50% - 1px), 0)

    span
      display: none

    &:before
      width: 8px
      height: 8px
      border-radius: 12px
      top: -4px

    &:hover
      cursor: pointer

      &:before
        transition-delay: 0s
        transition-duration: 100ms
        width: 14px
        height: 14px
        top: -7px

    &:active
      &:before
        width: 10px
        height: 10px
        top: -5px

    &--big
      &:before
        transition-delay: 0s
        transition-duration: 100ms
        width: 14px
        height: 14px
        top: -7px

  :global(.noCursor)
    *
      cursor: none !important

      &:before
        cursor: none !important

      &:after
        cursor: none !important

      &:hover
        cursor: none !important

  .grabboard
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    z-index: 9999
    cursor: none

    &:hover
      cursor: none

  .reference_description
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(calc(-50% + 1rem))
    font-size: $fs-micro

    &:before
      position: absolute
      left: -1rem
      top: 50%
      transform: translateY(-50%)
      content: ""
      width: 8px
      height: 8px
      border-radius: 12px
      background: currentColor
</style>
