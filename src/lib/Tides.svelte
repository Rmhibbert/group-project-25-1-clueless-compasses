<script>
    import { onMount } from 'svelte';
    let tides = {};
    let values = [];

onMount(async () => {
  const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=-45.88584470756695&long=170.51294108229843&numberOfDays=2&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
  tides = await res.json();
  values = tides.values;
});
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

</script>

<section>
    <h1>Dunedin Harbour Tides</h1>
    <ul>
        <!-- <li><strong>Latitude: {tides.metadata?.latitude}</strong></li>
        <li><strong>Longitude: {tides.metadata?.longitude} </strong></li> -->
        <li><strong>Start: {new Date(tides.metadata?.start).toDateString()} </strong></li>
        <li><strong>{tides.metadata?.days} day forecast</strong></li>
    </ul>
    <ul id="tide-list">
        {#each values as value }
          <li ><strong>{new Date(value.time).toLocaleString('en-NZ', options)}</strong></li>
          <li class="value">Height: {value.value}m</li>
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