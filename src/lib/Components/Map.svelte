<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { _ } from "$lib/actions/helpers";
  import { countRegion, countTotal, mapData, mode, selectedStory, stories, year, yearChanges } from "$lib/../stores";
  import { DisplayMode } from "$lib/enums";
  import loading from "$lib/actions/loading";
  import { infoMode } from "../../stores";

  export let mapSVG;
  let waterAll, waterBGAll;
  let yearUnsub, modeUnsub, selectedStoryUnsub;

  let redrawHash = null;

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

    let countReg = {
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
        if ($selectedStory >= 0) {
          const column_index = c_index.toString().padStart(2, "0");
          const row_index = r_index.toString().padStart(2, "0");
          const combined = `${row_index}-${column_index}`
          if ($stories[$selectedStory].zones.includes(`${combined}`)) {
            countReg[$mapData.map[r_index][c_index][colorYear]]++;
          }
        }
      });
    });

    const unsortedMap = new Map(Object.entries(count));
    const unsortedRegionMap = new Map(Object.entries(countReg));
    // const unsortedArray = [...unsortedMap];
    // const sortedArray = unsortedArray.sort(([key1, value1], [key2, value2]) =>  value2 - value1)

    countTotal.set(unsortedMap);
    countRegion.set(unsortedRegionMap);

    return new Map(unsortedMap);
  }

  async function recolor(colorYear: number) {
    const count = countZones();

    switch ($mode) {
      case DisplayMode.Map:
        waterAll.forEach((e: HTMLElement) => (e.style.stroke = blue));
        waterBGAll.forEach((e: HTMLElement) => (e.style.stroke = white));
        waterAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));
        waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));

        $mapData.map.forEach((row, r_index) => {
          row.forEach((entry, c_index) => {
            try {
              const column_index = c_index.toString().padStart(2, "0");
              const row_index = r_index.toString().padStart(2, "0");
              const combined = `${row_index}-${column_index}`
              // console.log(`_${row_index}-${column_index}`);

              _(`[id*='_${combined}']`).style.opacity = "1";

              if ($selectedStory >= 0) {
                if (!$stories[$selectedStory].zones.includes(`${combined}`)) {
                  _(`[id*='_${combined}']`).style.opacity = "0.2";
                }
              }

              _(`[id*='_${combined}']`).style.fill =
                color[$mapData.map[r_index][c_index][colorYear].toLowerCase()];
            } catch (e) {
            }
          });
        });
        break;
      case DisplayMode.Percent:
        waterAll.forEach((e: HTMLElement) => (e.style.opacity = "0"));
        waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "0"));

        let step = 0;
        count.forEach((value, key) => {
          if (key !== undefined) {
            for (let i = 0; i < value; i++) {
              let paddedStep = step.toString().padStart(3, "0");

              try {
                _(`[id*='-${paddedStep}']`).style.opacity = "1";
                _(`[id*='-${paddedStep}']`).style.fill = color[key.toString().toLowerCase()];
              } catch (e) {
                console.log(e, paddedStep);
              }

              step++;
            }
          }
        });
        break;
    }
  }

  function redraw() {
    const colorYear = findNextSmallerYear();

    let newHash = String(colorYear)+String($infoMode)+String($mode)+String($selectedStory);

    if (newHash !== redrawHash) {
      recolor(colorYear)
      redrawHash = newHash
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

    loading();

    setTimeout(() => {
      yearUnsub = year.subscribe(() => redraw());
      modeUnsub = mode.subscribe(() => redraw());
      selectedStoryUnsub = selectedStory.subscribe(() => redraw());
    }, 5000); // waits 5s until everything is displayed
  });

  onDestroy(() => {
    yearUnsub;
    modeUnsub;
    selectedStoryUnsub;
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
    transition-property: fill, stroke, opacity
</style>
