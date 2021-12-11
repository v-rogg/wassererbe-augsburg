<section id="manipulator">
	<div class="container">Manipulator</div>
</section>

<style lang="sass">
  @import "../styles/variables"

  #manipulator
    height: $p-bottom-spacing
    width: calc(100% - ($p-side-width * 2) + ($p-side-offset * 2))
    position: absolute
    bottom: 0
    left: calc($p-side-width - $p-side-offset)
    background: lightsalmon

  .container
    padding: 1em
</style>
