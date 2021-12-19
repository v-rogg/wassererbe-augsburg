<script>
  import { yearLimits } from "../../stores";
</script>

<div class="timeline">Timeline {$yearLimits.min} {$yearLimits.max}</div>

<style lang="sass">
  .timeline
    border: 1px dashed black
    padding: 1em
</style>
