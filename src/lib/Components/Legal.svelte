<section>
  <a href="/impressum"> Impressum </a>
  <a href="/datenschutz"> Datenschutz </a>
</section>

<style lang="sass">
  @import "src/styles/theme"

  section
    display: flex
    flex-direction: column
    text-align: right
    align-items: end
    justify-content: end
    width: 100%
    height: 100%
    font-size: $fs-micro

    a
      color: var(--c-black)
      text-decoration: none

      &:hover
        text-decoration: underline
</style>
