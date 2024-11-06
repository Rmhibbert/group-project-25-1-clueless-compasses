<script>
  import { onMount } from 'svelte';
  
  let tides = {};
  let values = [];
  let tidePairs = [];
  let selectedForecast = '2 day'; 
  
  onMount(async () => {
    const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=-45.88584470756695&long=170.51294108229843&numberOfDays=2&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
    tides = await res.json();
    values = tides.values;
    getTides(); 
  });

  function getTides() {
    tidePairs = [];  
    for (let i = 0; i < values.length; i += 2) {
      tidePairs.push([values[i], values[i + 1]]);
    }
  }

  const options = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false,
    timeZone: 'Pacific/Auckland'
  };

  function handleForecastChange(event) {
    selectedForecast = event.target.value;
  }

  
</script>

<section>
  <h1>Dunedin Harbour Tides</h1>
  <ul>
    <li><strong>Start: {new Date(tides.metadata?.start).toDateString()}</strong></li>
  </ul>

  <select bind:value={selectedForecast} on:change={handleForecastChange}>
    <option value="1 day">1 day forecast</option>
    <option value="2 day">2 day forecast</option>
  </select>

  <ul id="tide-list">
    {#each tidePairs.slice(0, selectedForecast === '1 day' ? 2 : 4) as pair}
      <li>
        <div>
          <strong>Low Tide: {new Date(pair[0].time).toLocaleString('en-NZ', options)}</strong>
          <p>Height: {pair[0].value}m</p>
        </div>
        
        <div>
          <strong>High Tide: {new Date(pair[1].time).toLocaleString('en-NZ', options)}</strong>
          <p>Height: {pair[1].value}m</p>
        </div>
      </li>
    {/each}
  </ul>
</section>



<style>
    #tide-list{
        list-style: none;
    }
    .value{
        padding-bottom: 0.6em;
    }
li{
  border-bottom: solid black 0.1em;
  list-style: none;
margin-top: 0.4em;
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
ul{
  padding:0;
}
</style>