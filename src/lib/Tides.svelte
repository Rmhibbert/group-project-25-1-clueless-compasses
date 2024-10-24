<script>
    import { onMount } from 'svelte';
    let tides = {};

onMount(async () => {
  const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=-45.88584470756695&long=170.51294108229843&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
  tides = await res.json();
});
</script>

<section>
<h1>Latest tide information for Dunedin</h1>
<h2>Tide graph goes here...</h2>
    <h2>Dunedin Tides timetable</h2>
    <ul>
        <li>Wed 16 Oct
            <p>High and Low tides</p>
        </li>
        <li>
            Wed 17 Oct
            <p>High and Low tides</p>
        </li>
        <li>
            Thu 18 Oct
            <p>High and Low tides</p>
        </li>
    </ul>
</section>

<style>

</style>