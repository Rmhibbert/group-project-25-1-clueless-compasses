<script>
  import { onMount } from 'svelte';

  let tides = {};
  let values = [];
  let tidePairs = [];
  let selectedForecast = '2 day';
  let loading = true;  // State to manage loading status

  const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Pacific/Auckland' };

  // Cities data
  const cities = [
    { name: "Auckland Harbour", lat: -36.8406, lon: 174.7650 },
    { name: "Tauranga Harbour", lat: -37.6555, lon: 176.1770 },
    { name: "Napier Port", lat: -39.4784, lon: 176.9186 },
    { name: "Wellington Harbour", lat: -41.2834, lon: 174.7790 },
    { name: "Nelson Harbour", lat: -41.2708, lon: 173.2830 },
    { name: "Lyttelton Harbour", lat: -43.6028, lon: 172.7190 },
    { name: "Dunedin Harbour", lat: -45.8788, lon: 170.5080 }
  ];

  let selectedCity = cities[6];  // Default city: Dunedin Harbour

  // Function to fetch tides for a selected city
  async function fetchTides(city) {
    loading = true;  // Set loading state to true while fetching
    try {
      const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=${city.lat}&long=${city.lon}&numberOfDays=2&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
      const data = await res.json();
      tides = data;
      values = tides.values || [];  // Ensure values is set
      getTides();  // Reprocess tide values into pairs
    } catch (error) {
      console.error('Error fetching tides:', error);
    } finally {
      loading = false;  // Set loading state to false after fetching
    }
  }

  // Convert values into pairs of high and low tides
  function getTides() {
  tidePairs = [];  // Reset tidePairs
  if (values && values.length > 1) {
    for (let i = 0; i < values.length; i += 2) {
      if (values[i] && values[i + 1]) {
        tidePairs.push([values[i], values[i + 1]]);
      }
    }
  }
}
  // On mount, fetch tides for the default city
  onMount(() => {
    fetchTides(selectedCity);
  });

  // Handle city change
  function handleCityChange() {
    fetchTides(selectedCity);
  }

  // Handle forecast length change
  function handleForecastChange(event) {
    selectedForecast = event.target.value;
  }
</script>

<section>
  <h1>{selectedCity.name} Tides</h1>

  <!-- City Selector -->
  <label for="city">Choose a city:</label>
  <select id="city" bind:value={selectedCity} on:change={handleCityChange}>
    {#each cities as city}
      <option value={city}>{city.name}</option>
    {/each}
  </select>

  <!-- Forecast Length Selector -->
  <select bind:value={selectedForecast} on:change={handleForecastChange}>
    <option value="1 day">1 day forecast</option>
    <option value="2 day">2 day forecast</option>
  </select>

  <!-- Loading Indicator -->
  {#if loading}
    <p>Loading tides...</p>
  {:else}

    <!-- Tide Data Table -->
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>HIGH</th>
          <th>LOW</th>
        </tr>
      </thead>
      <tbody>
        {#each tidePairs.slice(0, selectedForecast === '1 day' ? 2 : 4) as pair}
          {#if pair[0] && pair[1]}  <!-- Ensure pair is not undefined -->
            <tr>
              <td>{new Date(pair[0].time).toLocaleDateString('en-NZ', dateOptions)}</td>
              <td>
                <div>{new Date(pair[0].time).toLocaleTimeString('en-NZ', timeOptions)}</div>
                <div>{pair[0].value}m</div>
              </td>
              <td>
                <div>{new Date(pair[1].time).toLocaleTimeString('en-NZ', timeOptions)}</div>
                <div>{pair[1].value}m</div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<style>
  h1 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
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
    margin-bottom: 1em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
  }

  th, td {
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  td {
    font-size: 0.9em;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
</style>