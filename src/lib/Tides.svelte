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
  
    // Format options for date and time
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Pacific/Auckland' };
  
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
        {/each}
      </tbody>
    </table>
  </section>
  
  <style>
    section {
      font-family: Arial, sans-serif;
      padding: 1em;
    }
  
    h1 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
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
  