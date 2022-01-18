<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { _ } from "$lib/actions/helpers";
  import { mapData, mode, year, yearChanges } from "$lib/../stores";
  import { DisplayMode } from "$lib/enums";
  import gsap from "gsap";

  export let mapSVG;
  let waterAll, waterBGAll;
  let yearUnsub, modeUnsub;

  const blue = "#18A0FB";
  const white = "#FFFFFF";
  const color = {
    g: "#7B9F5C",
    a: "#CBAD1B",
    f: "#5E714D",
    r: "#a6604c",
    i: "#C0C0C0"
  };

  function findNextSmallerYear(): number {
    let num = 0;
    const sortedYears = $yearChanges;
    sortedYears.sort((a, b) => {
      return b - a;
    });
    sortedYears.forEach((y) => {
      if (y <= $year && y > num) {
        num = y;
      }
    });
    return num;
  }

  function countZones(): Map<string, number> {
    let count = {
      g: 0,
      a: 0,
      f: 0,
      r: 0,
      i: 0
    };

    const colorYear = findNextSmallerYear();

    $mapData.map.forEach((row, r_index) => {
      row.forEach((entry, c_index) => {
        count[$mapData.map[r_index][c_index][colorYear]]++;
      });
    });

    const unsortedMap = new Map(Object.entries(count));
    // const unsortedArray = [...unsortedMap];
    // const sortedArray = unsortedArray.sort(([key1, value1], [key2, value2]) =>  value2 - value1)
    return new Map(unsortedMap);
  }

  function recolor() {
    switch ($mode) {
      case DisplayMode.Map:
        waterAll.forEach((e: HTMLElement) => (e.style.stroke = blue));
        waterBGAll.forEach((e: HTMLElement) => (e.style.stroke = white));
        waterAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));
        waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));

        const colorYear = findNextSmallerYear();
        $mapData.map.forEach((row, r_index) => {
          row.forEach((entry, c_index) => {
            try {
              let column_index = c_index.toString().padStart(2, "0");
              let row_index = r_index.toString().padStart(2, "0");
              // console.log(`_${row_index}-${column_index}`);
              _(`[id*='_${row_index}-${column_index}']`).style.fill = color[$mapData.map[r_index][c_index][colorYear].toLowerCase()];
            } catch (e) {}
          });
        });
        break;
      case DisplayMode.Percent:
        waterAll.forEach((e: HTMLElement) => (e.style.opacity = "0"));
        waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "0"));

        const count = countZones();
        let step = 0;
        count.forEach((value, key) => {
          if (key !== undefined) {
            for (let i = 0; i < value; i++) {
              let paddedStep = step.toString().padStart(3, "0");

              try {
                _(`[id*='-${paddedStep}']`).style.fill = color[key.toString().toLowerCase()];
              } catch (e) {
                console.log(e, paddedStep);
              }

              step++;
            }
          }
        });
    }
  }

  onMount(async () => {
    waterAll = document.querySelectorAll(`[id*="_w"]`);
    waterBGAll = document.querySelectorAll(`[id*="_bgw"]`);

    waterAll.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.stroke = blue;
      el.style.opacity = 0;
    });

    const waterSpeed = 0.1;

    // TODO: Add GSAP .to
    // Der erste Parameter ist die ID des Flusses (siehe svg), duration und delay musst bei jedem fluss dann verändern. Momentan hast du 5s Zeit für die Ladeanimation. Das kannst du aber verändern, siehe nächstes Kommentar
    gsap.to("#_w-n", { "stroke-dashoffset": 0, duration: 25 * waterSpeed, delay: 0.5, ease: "none" });
    gsap.to("#_w-n", { opacity: 1, duration: 0.5, delay: 1, ease: "none" });

    gsap.to("#_w-a", { "stroke-dashoffset": 0, duration: 10 * waterSpeed, delay: 0.5, ease: "none" });
    gsap.to("#_w-a", { opacity: 1, duration: 0.5, delay: 1, ease: "none" });

    gsap.to("#_w-k", { "stroke-dashoffset": 0, duration: 10 * waterSpeed, delay: 0.5, ease: "none" });
    gsap.to("#_w-k", { opacity: 1, duration: 0.5, delay: 1, ease: "none" });

    gsap.to("#_w-m", { "stroke-dashoffset": 0, duration: 25 * waterSpeed, delay: 0.5, ease: "none" });
    gsap.to("#_w-m", { opacity: 1, duration: 0.5, delay: 1, ease: "none" });

    gsap.to("#_w-c", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 1.5, ease: "none" });
    gsap.to("#_w-c", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-b", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 1.5, ease: "none" });
    gsap.to("#_w-b", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-d", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2, ease: "none" });
    gsap.to("#_w-d", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-e", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2, ease: "none" });
    gsap.to("#_w-e", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-f", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2.5, ease: "none" });
    gsap.to("#_w-f", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-g", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2.5, ease: "none" });
    gsap.to("#_w-g", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-i", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 3, ease: "none" });
    gsap.to("#_w-i", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-h", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2.5, ease: "none" });
    gsap.to("#_w-h", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-l", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 2.5, ease: "none" });
    gsap.to("#_w-l", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-j", { "stroke-dashoffset": 0, duration: 5 * waterSpeed, delay: 3, ease: "none" });
    gsap.to("#_w-j", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-o", { "stroke-dashoffset": 0, duration: 24 * waterSpeed, delay: 1.5, ease: "none" });
    gsap.to("#_w-o", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-p", { "stroke-dashoffset": 0, duration: 15 * waterSpeed, delay: 2.5, ease: "none" });
    gsap.to("#_w-p", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-r", { "stroke-dashoffset": 0, duration: 25 * waterSpeed, delay: 2, ease: "none" });
    gsap.to("#_w-r", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-q", { "stroke-dashoffset": 0, duration: 15 * waterSpeed, delay: 3, ease: "none" });
    gsap.to("#_w-q", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-s", { "stroke-dashoffset": 0, duration: 4 * waterSpeed, delay: 4.5, ease: "none" });
    gsap.to("#_w-s", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-u", { "stroke-dashoffset": 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: "none" });
    gsap.to("#_w-u", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    gsap.to("#_w-t", { "stroke-dashoffset": 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: "none" });
    gsap.to("#_w-t", { opacity: 1, duration: 0, delay: 0, ease: "none" });

    setTimeout(() => {
      yearUnsub = year.subscribe(() => recolor());
      modeUnsub = mode.subscribe(() => recolor());
    }, 5000); // waits 5s until everything is displayed
  });

  onDestroy(() => {
    yearUnsub;
    modeUnsub;
  });
</script>

<section id="map">
  {#if mapSVG}
    {@html mapSVG}
  {/if}
</section>

<style lang="sass">
	#map
		height: 100%
		width: 100%
		opacity: 1

	:global(#map path)
		transition: .2s linear
		transition-property: fill, stroke
</style>
