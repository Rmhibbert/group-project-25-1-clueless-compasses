<script>
  let weather = {};

  load();
  // Using openweathermap API is metservice is restricted
  async function load() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-45.86634717379479&lon=170.51932073266735&appid=82336dbf0297a6e4f7502d515fcbad51&units=metric`);
  weather = await res.json();
  console.log(weather.rain);

  }

	// import { onMount } from 'svelte';
	// let weather;
	// onMount(async () => {
	// 	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-45.86634717379479&lon=170.51932073266735&appid=82336dbf0297a6e4f7502d515fcbad51`);
	// 	weather = await res.json();
  //   console.log(weather);
	// });


</script>

<section>
<h2>Current Weather</h2>
<h3>Warning</h3>
<h4>No Warnings at the moment</h4>
<ul>
  <li><strong>Location: </strong>{weather.name}</li>
  <li><strong>Temperature: </strong>{weather.main?.temp} °C</li>
  <li><strong>Humidity: </strong>{weather.main?.humidity} %</li>
  <!-- I've commented the the ones below as it's live so there isn't a high/low -->
  <!-- <li>Temperature (High): {tempHigh}</li>
  <li><strong>Temperature (Low): </strong>{tempLow}</li> -->
  <li><strong>Pressure: </strong>{weather.main?.pressure} Pa</li>
  <li><strong>Windspeed: </strong>{weather.wind?.speed} Knots</li>
  <li><strong>Windspeed Gusts: </strong>{weather.wind?.gust} Knots</li>

</ul>
</section>

<style>
    
</style>

