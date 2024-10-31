<script >
    import { onMount } from 'svelte';

let volcanos = [];

onMount(async () => {
  const res = await fetch(`https://api.geonet.org.nz/volcano/val`);
  let data = await res.json();
  volcanos = data.features;
  console.log(volcanos);
});
</script>
<section>
<h1>Volcano information</h1>
<h3>Volcano status by city:</h3>
{#each volcanos as volcano}
    <details>
    <summary>{volcano.properties.volcanoTitle}</summary>
        <p><strong>Activity:</strong> {volcano.properties.activity}</p>
        <p><strong>Level:</strong> {volcano.properties.level}</p>
        <p><strong>Hazards:</strong> {volcano.properties.hazards}</p>
        <p><strong>ACC:</strong> {volcano.properties.acc}</p>
    </details>
    {/each}
</section>
<style>
    summary{
        font-weight: bold;
        font-size: large;
    }

</style>