<script lang="ts">
  import Layout from "$lib/_Layout.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import Legal from "$lib/Components/Legal.svelte";
  import About from "$lib/Components/About.svelte";
</script>

<svelte:head>
  <title>Über das Projekt – Wassererbe Augsburg</title>
</svelte:head>

<Layout>
  <div slot="center_large">
    <h1>Über das Projekt</h1>
    <h2>Hintergrund</h2>
    <p>
      Wir sind Valentin Rogg und Nadine Keller – Masterstudenten im Bereich Interaktive Mediensysteme an der Hochschule Augsburg.<br />
      Für den Kurs Datenvisualisierung haben wir es uns zur Aufgabe gemacht, die Veränderung der Stadt Augsburg über die Jahre 1980 bis 2022
      darzustellen.<br />
      Augsburg hat durch seine vielen Flüsse und Kanäle ein besonderes Relikt, das die Stadtveränderung maßgeblich beeinflusst hat.<br />
      So entstand unser Projekt unter dem Namen <i>Wassererbe Augsburg</i>.
    </p>

    <h2>Quellen</h2>
  </div>

  <Brand slot="top_left" />

  <Legal slot="bottom_right" />
  <About slot="bottom_left" />
</Layout>

<style lang="sass">
  @import "src/styles/theme"

  h1
    color: $c-blue

</style>
