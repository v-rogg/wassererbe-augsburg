<script lang="ts">
  import Layout from "$lib/_Layout.svelte";
  import Brand from "$lib/Components/Brand.svelte";
  import Legal from "$lib/Components/Legal.svelte";
  import About from "$lib/Components/About.svelte";
  import { fly } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";

</script>

<svelte:head>
  <title>Impressum – Wassererbe Augsburg</title>
</svelte:head>

<Layout>
  <div slot="center" class="center" in:fly={{ x:-5, duration: 500, delay: 500, ease: sineOut }} out:fly={{ x: 5, duration: 500, ease: sineIn }}>
    <h1>Impressum</h1>
    <p>
      Angaben gemäß § 5 TMG<br/>
      <br/>
      Valentin Rogg<br/>
      Friedrich-Ebert-Str. 10b<br/>
      86368 Gersthofen<br/>
      <br/>
      Kontakt<br/>
      Telefon: 0821-1757090991<br/>
      Mail: mail@valentinrogg.de<br/>
    </p>
    <p>
      Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br/>
      <br>
      Valentin Rogg<br/>
      Friedrich-Ebert-Str. 10b<br/>
      86368 Gersthofen<br/>
      <br/>
      Haftungsausschluss:<br/>
      <br/>
      Haftung für Inhalte<br/>
      <br/>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br/>
      <br/>
      Haftung für Links<br/>
      <br/>
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br/>
      <br/>
      Urheberrecht<br>
      <br/>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br/>
      <br/>
      Datenschutz<br>
      <br/>
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.<br/>
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
      Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br/>
    </p>
  </div>

  <Brand slot="top_left" />
  <Legal slot="bottom_right" />
  <About slot="bottom_left" />
</Layout>


<style lang="sass">
  @import "src/styles/theme"

  .center
    //display: flex
    //flex-direction: column
    //justify-content: center
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
