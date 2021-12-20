<script lang="ts">
	import { year, yearLimits } from '../../stores';

  const timeDifference = $yearLimits.max - $yearLimits.min
  let displayYears = []
  for (let i = 0; i < timeDifference; i += 100) {
    displayYears.push(Math.ceil(($yearLimits.min + i)/100)*100);
  }

</script>

<div class="timeline">
  <div class="bar"></div>
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" class="arrow">
    <path d="M1 1L6 7L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
  </svg>
  <div class="yearLimitMin displayYear">
    {$yearLimits.min}
  </div>
  <div class="yearLimitMax displayYear removeLine">
    {$yearLimits.max === new Date().getFullYear() ? "Heute" : $yearLimits.max}
  </div>
  {#each displayYears as year}
    <div class="displayYear" style="left: {((year-$yearLimits.min) / timeDifference) * 100}%">
      {year}
    </div>
  {/each}
<!--  <div class="displayYear currentYear" style="left: {(($year-$yearLimits.min) / timeDifference) * 100}%" class:removeLine={((($year-$yearLimits.min) / timeDifference) * 100 < 0.5) || ((($year-$yearLimits.min) / timeDifference) * 100 > 99.5)}>-->
  <div class="displayYear currentYear" style="left: {(($year-$yearLimits.min) / timeDifference) * 100}%" class:removeLine={(($year-$yearLimits.min) / timeDifference) * 100 > 99.5}>
    {Math.floor($year)}
  </div>
</div>

<style lang="sass">
  @import "src/styles/theme"
  @import "src/styles/variables"

  .timeline
    display: flex
    align-items: center
    position: relative

  .bar
    position: absolute
    width: 100%
    height: 2px
    border-radius: 2px
    background: $c-black

  .arrow
    position: absolute
    right: 0
    transform: translateX(3px)

  .displayYear
    position: absolute
    font-size: .875em
    transform: translate(-50%, 1.75em)

    &:before
      content: ""
      background: black
      width: 1px
      height: calc(1.75em - 10px)
      position: absolute
      left: 50%
      top: calc(-100% + 1px)
      transform: translateX(-50%)
      transition: 200ms opacity cubic-bezier(0.645, 0.045, 0.355, 1)

  .yearLimitMax
    right: 0
    transform: translate(50%, 1.75em) !important

  .yearLimitMin
    transform: translate(calc(-50% - 1px), 1.75em) !important

  .currentYear
    transform: translate(-50%, -1.5em)
    font-size: 1.125em
    font-weight: $fw-bold

    &:before
      width: 2px
      top: auto
      height: calc(1.5em - 13px)
      bottom: calc(-100% + 8px)

  .removeLine
    &:before
      opacity: 0
</style>
