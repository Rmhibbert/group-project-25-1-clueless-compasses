<script>
  import { onMount } from 'svelte';

  let quakes = [];

  let selectedMmi = '1';

  async function fetchQuakes(mmi) {
    const res = await fetch(`https://api.geonet.org.nz/quake?MMI=${mmi}`);
    let data = await res.json();
    
    // Filters based on the mmi
    quakes = data.features.filter(quake => quake.properties.mmi.toString() === mmi);
  }

  onMount(() => {
    fetchQuakes(selectedMmi);
  });

  // Fetch data when selectedMmi changes
  $: fetchQuakes(selectedMmi);
</script>

<section>
  <h1>Earthquake information</h1>
  
  <select bind:value={selectedMmi}>
    <option value="1">1 MMI</option>
    <option value="2">2 MMI</option>
    <option value="3">3 MMI</option>
    <option value="4">4 MMI</option>
    <option value="5">5 MMI</option>
    <option value="6">6 MMI</option>
    <option value="7">7 MMI</option>
    <option value="8">8 MMI</option>
  </select>
  
  {#each quakes as quake}
    <details>
    <summary>{quake.properties.locality}</summary>
    <p>Depth: {quake.properties.depth.toFixed(2)} km</p>
    <p>Magnitude: {quake.properties.magnitude.toFixed(2)}</p>
    <p>MMI: {quake.properties.mmi}</p>
    <small>Time: {new Date(quake.properties.time).toLocaleString('en-NZ')}</small>
    </details>
  {/each}

  {#if quakes.length === 0}
    <p>No earthquakes found with MMI equal to {selectedMmi}.</p>
  {/if}
  </section>

<style>
</style>
