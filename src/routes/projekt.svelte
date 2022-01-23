<script lang="ts">
  import Layout from "$lib/_Layout.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import Legal from "$lib/Components/Legal.svelte";
  import About from "$lib/Components/About.svelte";
  import { fly } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
</script>

<svelte:head>
  <title>Über das Projekt – Wassererbe Augsburg</title>
</svelte:head>

<Layout>
  <div slot="center" class="center" in:fly={{ x:-5, duration: 500, delay: 500, ease: sineOut }} out:fly={{ x: 5, duration: 500, ease: sineIn }}>
    <h1>Über das Projekt</h1>
    <h2>Hintergrund</h2>
    <p>
      Wir sind <a href="https://www.linkedin.com/in/nadine-keller-0ba4aa226/">Nadine Keller</a> und <a href="https://valentinrogg.de">Valentin Rogg</a> – Masterstudenten im Bereich Interaktive Mediensysteme an der Hochschule Augsburg.<br />
      Für den Kurs Datenvisualisierung haben wir es uns zur Aufgabe gemacht, die Veränderung der Stadt Augsburg über die Jahre 1980 bis 2022
      darzustellen.<br />
      Augsburg hat durch seine vielen Flüsse und Kanäle ein besonderes Relikt, welches die Stadtveränderung maßgeblich beeinflusst hat.<br />
      So entstand unser Projekt unter dem Namen Wassererbe Augsburg.
    </p>

    <h2>Quellen</h2>
    <p>
      Martin Kluger (2019). Welterbe Wasser. Context Verlag Augsburg.<br />
      <br />
      Christoph Emmendörffer (2018). Wasser Kunst Augsburg: Die Reichsstadt in ihrem Element. 	Schnell & Steiner.<br />
      <br />
      Das Augsburger Wassermanagement-System (2022). <a href="https://wassersystem-augsburg.de/">https://wassersystem-augsburg.de/</a>.<br />
      <br />
      Geoportal Bayern (2022). <a href="https://geoportal.bayern.de/bayernatlas/?lang=de&topic=zeitr&bgLayer=atkis&E=640114.21&N=5359400.70&zoom=9&layers=zeitreihe_tk,zeitreihe_tk&layers_timestamp=18911231,18911231&layers_opacity=1,0&time=1891.">https://geoportal.bayern.de/bayernatlas/?lang=de&topic=zeitr&bgLayer=atkis&E=640114.21&N=5359400.70&zoom=9&layers=zeitreihe_tk,zeitreihe_tk&layers_timestamp=18911231,18911231&layers_opacity=1,0&time=1891.</a>.<br />
      <br />
      Wikipedia (2022). Hauptstadtbach. https://de.wikipedia.org/wiki/Hauptstadtbach.<br />
      <br />
      Wikipedia (2022). Hochablass. https://de.wikipedia.org/wiki/Hochablass.<br />
      <br />
      Wikipedia (2022). Lechviertel. https://de.wikipedia.org/wiki/Augsburg-Lechviertel.<br />
      <br />
      Wikipedia (2022). Textilviertel. https://de.wikipedia.org/wiki/Augsburger_Textilviertel.<br />
      <br />
      Wikipedia (2022). Proviantbachquartier. https://de.wikipedia.org/wiki/Proviantbachquartier.<br />
      <br />
      Wikipedia (2022). Herrenbachviertel. https://de.wikipedia.org/wiki/Augsburg-Wolfram-_und_Herrenbachviertel<br />
      <br />
      Wikipedia (2022). Hochfeld. https://de.wikipedia.org/wiki/Augsburg-Hochfeld.<br />
    </p>
  </div>

  <Brand slot="top_left" />
  <Legal slot="bottom_right" />
  <About slot="bottom_left" />
</Layout>


<style lang="sass">
  @import "src/styles/theme"

  h2
    margin: .5rem 0

  .center
    display: flex
    flex-direction: column
    justify-content: center
    height: 100%
    padding-right: 2rem
    overflow-y: auto
    scrollbar-width: thin
    scrollbar-color: var(--c-grey-30) var(--c-grey-10)
    scrollbar-gutter: stable

    &::-webkit-scrollbar
      width: 4px

    &::-webkit-scrollbar-track
      background-color: var(--c-grey-10)

    &::-webkit-scrollbar-thumb
      height: 30px
      background-color: var(--c-grey-30)
</style>
