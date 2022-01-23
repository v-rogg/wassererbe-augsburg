<script lang="ts">
  import Layout from "$lib/_Layout.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import Legal from "$lib/Components/Legal.svelte";
  import About from "$lib/Components/About.svelte";
  import { fly } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
</script>

<svelte:head>
  <title>Datenschutz – Wassererbe Augsburg</title>
</svelte:head>

<Layout>
  <div slot="center" class="center" in:fly={{ x:-5, duration: 500, delay: 500, ease: sineOut }} out:fly={{ x: 5, duration: 500, ease: sineIn }}>
    <h1>Datenschutzerklärung</h1>
    <p>
      Stand: 12. Januar 2022<br />
      <br />
      Valentin Rogg<br />
      Friedrich-Ebert-Str. 10b<br />
      86368 Gersthofen<br />
      <br />
      Kontakt<br />
      Telefon: 0821-1757090991<br/>
      Mail: mail@valentinrogg.de<br />
      <br />
      Es werden keine Daten erhoben oder weiterverarbeitet.<br />
      <br />
      Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung an,
      sobald die Änderungen der von uns durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die
      Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.
      Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von Unternehmen und Organisationen angeben, bitten wir zu
      beachten, dass die Adressen sich über die Zeit ändern können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
    </p>
  </div>

  <Brand slot="top_left" />
  <Legal slot="bottom_right" />
  <About slot="bottom_left" />
</Layout>


<style lang="sass">
  @import "src/styles/theme"

  .center
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
