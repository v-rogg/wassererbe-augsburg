<a class="brand" href="/">
  <svg
    class="logo"
    viewBox="0 0 132 118"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    preserveAspectRatio="none"
    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
  >
    <path
      id="_2-3"
      d="M129.663,51.738C132.222,56.166 132.222,61.624 129.663,66.055L103.928,110.631C101.369,115.063 96.645,117.79 91.53,117.79L40.053,117.79C34.938,117.79 30.213,115.063 27.654,110.631L1.919,66.055C-0.64,61.624 -0.64,56.166 1.919,51.738L27.654,7.159C30.213,2.727 34.938,0 40.053,0L91.53,0C96.645,0 101.369,2.727 103.928,7.159L129.663,51.738Z"
      style="fill:var(--active);fill-rule:nonzero;"
    />
    <path
      d="M70.113,22.578C68.939,18.342 62.85,18.158 61.529,22.578C54.662,45.728 39.989,52.023 39.989,68.325C39.989,82.778 51.544,94.458 65.814,94.458C80.084,94.458 91.639,82.774 91.639,68.325C91.639,51.92 77.009,45.831 70.113,22.578Z"
      style="fill:#FFFFFF;fill-rule:nonzero;"
    />
  </svg>

  <h1>
    <span class="title"> Wassererbe </span>
    <span class="subtitle"> Augsburg </span>
  </h1>
</a>

<style lang="sass">
  @import "src/styles/variables"
  @import "src/styles/theme"

  .brand
    display: flex
    align-items: center
    color: var(--c-black)
    text-decoration: none

  .logo
    height: 2.7rem
    margin-right: .5rem

    path
      transition: 400ms fill cubic-bezier(0.645, 0.045, 0.355, 1)
      fill: var(--active)

  h1
    font-size: $fs-big
    display: flex
    flex-direction: column
    margin: 0
    padding: 0

  .title
    font-size: $fs-big
    font-weight: $fw-medium
    line-height: .9

  .subtitle
    font-size: 1.125rem
    font-weight: $fw-regular
    line-height: 1
</style>
