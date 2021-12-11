<section id="map">
  <div class="container">
    Map
  </div>
</section>

<style lang="sass">
  @import "../styles/variables"

  #map
    width: calc(100% - $p-side-width - $p-side-width)
    background: lightblue
    position: absolute
    top: $p-top-spacing
    bottom: $p-bottom-spacing
    left: $p-side-width

  .container
    padding: 1em
</style>
