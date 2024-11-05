<script>
  import { onMount } from 'svelte';

  let weather = {};
  let selectedCity = 'Christchurch';

  const cities = [
    { name: "Christchurch", lat: -43.5321, lon: 172.6362 },
    { name: "Auckland", lat: -36.8485, lon: 174.7633 },
    { name: "Wellington", lat: -41.2865, lon: 174.7762 },
    { name: "Dunedin", lat: -45.8666, lon: 170.5190 },
    { name: "Hamilton", lat: -37.7870, lon: 175.2793 },
    { name: "Tauranga", lat: -37.6878, lon: 176.1651 },
    { name: "Napier", lat: -39.4928, lon: 176.9120 },
    { name: "Nelson", lat: -41.2706, lon: 173.2840 }
  ];

  async function fetchWeather(cityName) {
    const city = cities.find(c => c.name === cityName);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=82336dbf0297a6e4f7502d515fcbad51&units=metric`);
    weather = await res.json();
  }

  onMount(() => {
    fetchWeather(selectedCity);
  });
</script>


<section>
  <h2>Current Weather</h2>
  
  <label for="city">Choose a city:</label>
  <select id="city" bind:value={selectedCity} on:change={() => fetchWeather(selectedCity)}>
    {#each cities as city}
      <option value={city.name}>{city.name}</option>
    {/each}
  </select>
  

  <h3>Warning</h3>
  <h4>No Warnings at the moment</h4>
  <ul>
    <li><strong>Location: </strong>{weather.name}</li>
    <li><strong>Temperature: </strong>{weather.main?.temp} °C</li>
    <li><strong>Humidity: </strong>{weather.main?.humidity} %</li>
    <li><strong>Pressure: </strong>{weather.main?.pressure} Pa</li>
    <li><strong>Windspeed: </strong>{weather.wind?.speed} Knots</li>
    <li><strong>Windspeed Gusts: </strong>{weather.wind?.gust} Knots</li>
  </ul>
</section>




<style>
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
label{
  font-size: 1.2rem;
}

</style>

