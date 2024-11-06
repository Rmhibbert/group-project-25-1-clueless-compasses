<script>
    import { onMount } from 'svelte';
    let tides = {};
    let values = [];
    let tidePairs = [];
  
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
        console.log(tidePairs[i]);
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
  </script>
  
  <section>
    <h1>Dunedin Harbour Tides</h1>
    <ul>
      <li><strong>Start: {new Date(tides.metadata?.start).toDateString()}</strong></li>
      <li><strong>{tides.metadata?.days} day forecast</strong></li>
    </ul>
  
    <ul id="tide-list">
      {#each tidePairs as pair}
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
    
</style>