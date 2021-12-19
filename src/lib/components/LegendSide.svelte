<section>
  <h3>
    Nutzung der Zone
  </h3>
  <div class="icons">
    <div>
      <img src="/legend/land.svg" alt="" />
      Landwirtschaft
    </div>
    <div>
      <img src="/legend/grass.svg" alt="" />
      Grasland
    </div>
    <div>
      <img src="/legend/forest.svg" alt="" />
      Wald
    </div>
    <div>
      <img src="/legend/residential.svg" alt="" />
      Wohnraum
    </div>
    <div>
      <img src="/legend/industrial.svg" alt="" />
      Industrie
    </div>
    <div>
      <img src="/legend/energy.svg" alt="" />
      Energiegewinnung
    </div>
    <div>
      <img src="/legend/special.svg" alt="" />
      Fixpunkt
    </div>
  </div>
</section>

<style lang="sass">
  @import "src/styles/variables"

  section
    position: absolute
    top: 45%
    left: 50%
    transform: translate(-50%, -50%)
    width: $p-side-content-width

    .icons
      display: flex
      flex-direction: column

      div
        display: flex
        align-items: center
        margin-bottom: .5em

      img
        margin-right: 1em

  h3
    font-weight: $fw-medium
    padding-left: .75em
</style>
