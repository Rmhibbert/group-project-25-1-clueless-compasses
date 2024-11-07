<script>
    import { onMount } from 'svelte';
    let tides = {};
    let values = [];

    const cities = [
        { name: "Auckland Harbour", lat: -36.8406, lon: 174.7650 },
        { name: "Wellington Harbour", lat: -41.2834, lon: 174.7790 },
        { name: "Lyttelton Harbour (Christchurch)", lat: -43.6028, lon: 172.7190 },
        { name: "Tauranga Harbour", lat: -37.6555, lon: 176.1770 },
        { name: "Napier Port", lat: -39.4784, lon: 176.9186 },
        { name: "Nelson Harbour", lat: -41.2708, lon: 173.2830 },
        { name: "Dunedin Harbour", lat: -45.8788, lon: 170.5080 },
    ];

    let selectedCity = cities[6];
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

    async function fetchTides(city) {
        const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=${city.lat}&long=${city.lon}&numberOfDays=2&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
        tides = await res.json();
        values = tides.values;
    }

    onMount(() => {
        fetchTides(selectedCity);
    });
</script>

<section>
    <label for="city">Choose a city:</label>
    <select id="city" bind:value={selectedCity} on:change={() => fetchTides(selectedCity)}>
        {#each cities as city}
            <option value={city}>{city.name}</option>
        {/each}
    </select>

    <h1>{selectedCity.name} Tides</h1>
    <ul>
        <li><strong>Start: {new Date(tides.metadata?.start).toDateString()}</strong></li>
        <li><strong>{tides.metadata?.days} day forecast</strong></li>
    </ul>
    <ul id="tide-list">
        {#each values as value}
            <li><strong>{new Date(value.time).toLocaleString('en-NZ', options)}</strong></li>
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