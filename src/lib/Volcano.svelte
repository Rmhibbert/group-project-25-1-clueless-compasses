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
<h1>Volcano </h1>
{#each volcanos as volcano}
    <h3>{volcano.properties.volcanoTitle}</h3>
    <p>Activity: {volcano.properties.activity}</p>
    <p>Level: {volcano.properties.level}</p>
    <p>Hazards: {volcano.properties.hazards}</p>
    <p>ACC: {volcano.properties.acc}</p>
    {/each}
</section>
<style>
    section{
      overflow:scroll; height:30em;
    }
</style>