<script>
	import { selectedEoI } from '$lib/../stores';
	import { fly } from 'svelte/transition';
</script>

{#if $selectedEoI < 0}
	<section transition:fly={{ duration: 200, y: -100 }}>
		<h3>Nutzung der Zone</h3>
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
			<div>
				<img src="/legend/city.svg" alt="" />
				Stadt <span style="font-size: .7em; margin-left: .5em">(Allgemein)</span>
			</div>
			<div>
				<img src="/legend/unknown.svg" alt="" />
				Unbekannt
			</div>
		</div>
	</section>
{/if}

<style lang="sass">
  @import "../../styles/variables"
  @import "../../styles/theme"

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
