<script>
  import { showHamburger } from "../../stores";
</script>

<div class="row">
  <input type="checkbox" id="hamburg" checked={$showHamburger} on:change={(e) => {
    showHamburger.set(e.target.checked)
  }}>
  <label for="hamburg" class="hamburg">
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
  </label>
</div>

<style lang="sass">
  @import "src/styles/theme"

  label.hamburg
    display: block
    width: 2rem
    height: 2rem
    position: relative
    margin-left: auto
    margin-right: auto
    border-radius: 4px

    &:hover
      cursor: pointer

  input#hamburg
      display: none

  .line
    position: absolute
    height: 3px
    width: 2rem
    background: var(--c-black)
    border-radius: $bor-normal
    display: block
    transition: 0.5s
    transform-origin: center


  .line:nth-child(1)
    top: calc(2rem * 0)
  .line:nth-child(2)
    top: calc(2rem * (1/3))
  .line:nth-child(3)
    top: calc(2rem * (2/3))

  #hamburg:checked + .hamburg .line:nth-child(1)
    transform: translateY(calc(2rem * (1/3))) rotate(-45deg)


  #hamburg:checked + .hamburg .line:nth-child(2)
    opacity: 0


  #hamburg:checked + .hamburg .line:nth-child(3)
    transform: translateY(calc(-2rem * (1/3))) rotate(45deg)

</style>
