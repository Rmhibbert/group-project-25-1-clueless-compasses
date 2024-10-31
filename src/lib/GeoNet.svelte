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

  const emojis = {
        Green: "🟩",
        Yellow: "🟨",
        Red: "🟥",
        Orange:"🟧"
};
</script>

<section>
  <h1>Earthquake information</h1>
  
  <select bind:value={selectedMmi}>
    <option value="1">{emojis.Green}1 - Unnoticeable</option>
    <option value="2">{emojis.Green}2 - Unnoticeable</option>
    <option value="3">{emojis.Yellow}3 - Weak</option>
    <option value="4">{emojis.Yellow}4 - Light</option>
    <option value="5">{emojis.Orange}5 - Moderate</option>
    <option value="6">{emojis.Orange}6 - Strong</option>
    <option value="7">{emojis.Red}7 - Severe</option>
    <option value="8">{emojis.Red}8 - Extreme</option>
  </select>
  <small id="intesity-link"><a href="https://www.geonet.org.nz/earthquake/intensity">Earthquake intensity explained</a></small>

  {#each quakes as quake}
    <details>
    <summary>{quake.properties.locality}</summary>
    <p>Depth: {quake.properties.depth.toFixed(2)} km</p>
    <p>Magnitude: {quake.properties.magnitude.toFixed(2)}</p>
    <p>MMI: {quake.properties.mmi}</p>
    <small class="time">Time: {new Date(quake.properties.time).toLocaleString('en-NZ')}</small>
    </details>
  {/each}

  {#if quakes.length === 0}
    <p>No earthquakes found with MMI equal to {selectedMmi}.</p>
  {/if}

  </section>

<style>

summary {
  cursor: pointer;
}

details{
  padding:0.3em;
  font-weight: 500;
}

select {
    width: 9.5em; 
    padding: 0.2em; 
    border-radius: 0.2em; 
    background-color: #ffffff; 
    color: #333; 
    font-size: 1em; 
    appearance: none; 
    cursor: pointer; 
}

option {
    cursor: pointer;
}
a{
  padding-left: 1em;
  position: fixed;
}

</style>
