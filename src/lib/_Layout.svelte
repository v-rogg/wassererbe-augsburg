<script lang="ts">
	import { mode } from '../stores.ts';
</script>

<svelte:head>
	<title>Wassererbe Augsburg</title>
</svelte:head>

<main class="container">
	<div class="app active-{$mode}">
		<img class="ratio" src="ratio.png" alt="resize" aria-hidden="true" />
		<div class="center abs">
			<slot name="center" />
		</div>
		<div class="top left abs">
			<slot name="top-left" />
		</div>
		<div class="top h-mid abs">
			<slot name="top-mid" />
		</div>
		<div class="v-mid left abs">
			<slot name="mid-left" />
		</div>
		<div class="v-mid right abs">
			<slot name="mid-right" />
		</div>
		<div class="bottom h-mid abs">
			<slot name="bottom-mid" />
		</div>
		<div class="bottom left abs">
			<slot name="bottom-left" />
		</div>
		<div class="bottom right abs">
			<slot name="bottom-right" />
		</div>
	</div>
</main>

<style lang="sass">
  @import "src/styles/theme"

  .container
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  .app
    max-width: 1920px
    max-height: 1400px
    //height: 100%
    position: relative
    width: max-content
    //height: max-content
    top: -17px

  .ratio
    display: block
    max-height: calc(100vh - 100px - 70px - 4rem)
    max-width: calc(100vw - 460px - 8rem)
    margin: auto
    height: max-content
    width: auto

  .abs
    position: absolute
    display: flex
    align-items: center

  .left
    left: -230px
    width: 230px

  .right
    right: -230px
    width: 230px

  .top
    top: -70px
    height: 60px

  .v-mid
    top: 0
    height: 100%

  .h-mid
    left: 10%
    width: 80%


  .bottom
    bottom: -100px
    height: 70px

  .center
    top: 0
    left: 0
    width: 100%
    height: 100%

  :global(.active-0)
    //:root
    --active: #{$c-blue}

  :global(.active-1)
    //:root
    --active: #{$c-green}
</style>
