<script >
    import { onMount } from 'svelte';

//Blank Array
let quakes = [];

onMount(async () => {
  //Shows earthquakes with a 
  const res = await fetch(`https://api.geonet.org.nz/quake?MMI=6`);
  let data = await res.json();
  quakes = data.features;
  console.log(quake.properties);
  // console.log(quakes[0].properties.depth);

});


</script>

  <section>
    <h1>Earthquake information</h1>
    <small>*Displays earthquake with MMI equal to 6</small>
    {#each quakes as quake}
    <h3>{quake.properties.locality}</h3>
    <p>Depth: {quake.properties.depth} km</p>
    <p>Magnitude: {quake.properties.magnitude}</p>
    <p>MMI: {quake.properties.mmi}</p>
    <p>Time: {quake.properties.time}</p>
    
    {/each}
    <!-- <select class="sortByDropdown" value="place" placeholder="Select option">
      <option value="Latest">Latest</option>
      <option value="Strongest">Strongest</option>
      <option value="Weakest">Weakest</option>
    </select>
    <p class="result"></p>
    <ul>
      <li value="2.8">
        <h4>Category: Weak</h4>
        <p>Wed Oct 16 2024 12:58PM</p>
        <p>Magnitude: 2.8</p>
        <p>5km West of Porangahau</p>
      </li>
      <li value="2.7">
        <h4>Category: Weak</h4>
        <p>Wed Oct 16 2024 12:58PM</p>
        <p>Magnitude: 2.7</p>
        <p>Within 5 km of Porangahau</p>
      </li>
      <li value="3.5">
        <h4>Category: Weak</h4>
        <p>Wed Oct 16 2024 12:58PM</p>
        <p>Magnitude: 3.5</p>
        <p>15 km south-west of Porangahau</p>
      </li>
      <li value="3.0">
        <h4>Category: Weak</h4>
        <p>Wed Oct 16 2024 12:58PM</p>
        <p>Magnitude: 3.0</p>
        <p>5 km south of Porirua</p>
      </li>
      <li value="5.2">
        <h4>Category: Weak</h4>
        <p>Wed Oct 16 2024 12:58PM</p>
        <p>Magnitude: 5.2</p>
        <p>130 km north of Te Kaha</p>
      </li>
    </ul> -->
  </section>

<style>
    section{
      overflow:scroll; height:400px;
    }
  li {
    list-style: none;
    border: solid;
    margin-left: 0;
    border-radius: .5em;
    padding: 0px;
  }
  ul{
    padding: 0;
    margin: 0%;
  }
</style>
