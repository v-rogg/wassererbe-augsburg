<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { _, findNextSmallerYear } from "$lib/actions/helpers";
  import {
    countRegion,
    countTotal,
    displayReference, firstLoad,
    mapData,
    mode,
    selectedStory,
    stories,
    year,
    infoMode, mapLoaded
  } from "$lib/../stores";
  import { DisplayMode } from "$lib/enums";
  import loading from "$lib/actions/loading";
  import { fade } from "svelte/transition";
  import { sineIn } from "svelte/easing";
  import gsap from "gsap";

  export let mapSVG;
  let waterAll, waterBGAll, referenceAll, waterHelpers;
  let yearUnsub, modeUnsub, selectedStoryUnsub, displayReferenceUnsub;
  let loaded = false;
  let riverShow = false;

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

    if ($mapLoaded) {
      if ($displayReference) {
        waterAll.forEach((e: HTMLElement) => (e.style.stroke = "var(--c-river-dull)"));
        referenceAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));

        $mapData.map.forEach((row, r_index) => {
          row.forEach((entry, c_index) => {
            try {
              const column_index = c_index.toString().padStart(2, "0");
              const row_index = r_index.toString().padStart(2, "0");
              const combined = `${row_index}-${column_index}`

              _(`[id*='_${combined}']`).style.opacity = "0.2";
            } catch (e) {
            }
          });
        });
      } else {
        waterAll.forEach((e: HTMLElement) => (e.style.stroke = "var(--c-river)"));
        referenceAll.forEach((e: HTMLElement) => (e.style.opacity = "0"));

        $mapData.map.forEach((row, r_index) => {
          row.forEach((entry, c_index) => {
            try {
              const column_index = c_index.toString().padStart(2, "0");
              const row_index = r_index.toString().padStart(2, "0");
              const combined = `${row_index}-${column_index}`

              _(`[id*='_${combined}']`).style.opacity = "1";
            } catch (e) {
            }
          });
        });
      }
    }

    switch ($mode) {
      case DisplayMode.Map:
        if (!$displayReference) {
          waterAll.forEach((e: HTMLElement) => (e.style.stroke = "var(--c-river)"));
        }

        if ($mapLoaded) {
          waterAll.forEach((el) => {
            el.style.strokeDashoffset = 0;
          });
          waterBGAll.forEach((el) => {
            el.style.strokeDashoffset = 0;
          });
        }

        waterBGAll.forEach((e: HTMLElement) => (e.style.stroke = "var(--c-white)"));
        waterAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));
        waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));
        waterHelpers.forEach((e: HTMLElement) => (e.style.opacity = "0"));

        $mapData.map.forEach((row, r_index) => {
          row.forEach((entry, c_index) => {
            try {
              const column_index = c_index.toString().padStart(2, "0");
              const row_index = r_index.toString().padStart(2, "0");
              const combined = `${row_index}-${column_index}`
              // console.log(`_${row_index}-${column_index}`);

              // _(`[id*='_${combined}']`).style.opacity = "1";
              // waterAll.forEach((e: HTMLElement) => (e.style.opacity = '1'));
              // waterBGAll.forEach((e: HTMLElement) => (e.style.opacity = "1"));
              if ($mapLoaded) {
                _(`[id*='_${combined}']`).style.opacity = "1";
                console.log(loaded);
              }

              if ($selectedStory >= 0) {
                waterAll.forEach((e: HTMLElement) => (e.style.stroke = "var(--c-river-dull)"));


                if (!$stories[$selectedStory].zones.includes(`${combined}`)) {
                  _(`[id*='_${combined}']`).style.opacity = "0.2";
                }

                for (let ref of $stories[$selectedStory].references) {
                  _(`[id=${ref}]`).style.opacity = "1"
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
                // _(`[id*='-${paddedStep}']`).style.opacity = "1";
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

    let newHash = String(colorYear)+String($infoMode)+String($mode)+String($selectedStory)+String($displayReference);



    if ($year >= 1972 && !riverShow) {
      riverShow = true;
      gsap.to('#_w-s', { 'stroke-dashoffset': 0, duration: 4 * .1, delay: 0, ease: 'none' });
      gsap.to('#_bgw-s', { 'stroke-dashoffset': 0, duration: 4 * .1, delay: 0, ease: 'none' });

      gsap.to('#_w-u', { 'stroke-dashoffset': 0, duration: 1.5 * .1, delay: 0.3, ease: 'none' });
      gsap.to('#_bgw-u', { 'stroke-dashoffset': 0, duration: 1.5 * .1, delay: 0.3, ease: 'none' });

      gsap.to('#_w-t', { 'stroke-dashoffset': 0, duration: 1.5 * .1, delay: 0.3, ease: 'none' });
      gsap.to('#_bgw-t', { 'stroke-dashoffset': 0, duration: 1.5 * .1, delay: 0.3, ease: 'none' });
    } else if ($year < 1972 && riverShow) {
      riverShow = false;
      gsap.to('#_w-s', { 'stroke-dashoffset': _('#_w-s').getTotalLength(), duration: 4 * .1, delay: 0.3, ease: 'none' });
      gsap.to('#_bgw-s', { 'stroke-dashoffset': _('#_bgw-s').getTotalLength(), duration: 4 * .1, delay: 0.3, ease: 'none' });

      gsap.to('#_w-u', { 'stroke-dashoffset': _('#_w-u').getTotalLength() + 1, duration: 1.5 * .1, delay: 0, ease: 'none' });
      gsap.to('#_bgw-u', { 'stroke-dashoffset': _('#_bgw-u').getTotalLength() + 1, duration: 1.5 * .1, delay: 0, ease: 'none' });

      gsap.to('#_w-t', { 'stroke-dashoffset': _('#_w-t').getTotalLength() + 1, duration: 1.5 * .1, delay: 0, ease: 'none' });
      gsap.to('#_bgw-t', { 'stroke-dashoffset': _('#_bgw-t').getTotalLength() + 1, duration: 1.5 * .1, delay: 0, ease: 'none' });
    }

    if (newHash !== redrawHash) {
      recolor(colorYear)
      redrawHash = newHash
    }
  }

  let ready = false;

  onMount(async () => {
    ready = true;
    waterAll = document.querySelectorAll(`[id*="_w"]`);
    waterBGAll = document.querySelectorAll(`[id*="_bgw"]`);
    referenceAll = document.querySelectorAll(`[id*="_ref"]`);
    waterHelpers = document.querySelectorAll(`[id*="_hw"]`);

    waterAll.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.stroke = blue;
    });

    waterBGAll.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.stroke = "var(--c-white)"
    });

    referenceAll.forEach((el) => {
      el.style.opacity = "0"
    });

    waterHelpers.forEach((el) => {
      el.style.opacity = "0"
    });

    if ($firstLoad) {
      loading();
    }
    yearUnsub = year.subscribe(() => redraw());
    modeUnsub = mode.subscribe(() => redraw());
    selectedStoryUnsub = selectedStory.subscribe(() => redraw());
    displayReferenceUnsub = displayReference.subscribe(() => redraw());
  });

  onDestroy(() => {
    yearUnsub;
    modeUnsub;
    selectedStoryUnsub;
    displayReferenceUnsub;
  });
</script>

<section id="map" out:fade={{duration: 500, ease: sineIn }}>
  {#if mapSVG}
    {@html mapSVG}
  {/if}
</section>

<style lang="sass">
  #map
    height: 100%
    width: 100%
    opacity: 1

  :global(#map g)
    transition: .2s linear
    transition-property: fill, stroke, opacity

  :global(#map g)
    text-shadow: 0 0 3px var(--c-white)


  :global(#map path)
    transition: .2s linear
    transition-property: fill, stroke, opacity
</style>
