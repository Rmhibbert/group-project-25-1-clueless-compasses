<script >
    import { onMount } from 'svelte';

//Blank Array
let volcanos = [];

onMount(async () => {
  //Shows earthquakes with a 
  const res = await fetch(`https://api.geonet.org.nz/quake?MMI=6`);
  let data = await res.json();
  volcanos = data.features;
});
</script>
