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
    align-items: flex-end
    justify-content: flex-end
    width: 100%
    height: 100%
    font-size: $fs-small

    a
      color: var(--c-black)
      text-decoration: none

      &:hover
        text-decoration: underline
</style>
