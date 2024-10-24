<script>
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Tides from '$lib/Tides.svelte';
</script>

<main>
  <Metservice />  
  <CivilDefence /> 
  <GeoNet />
  <Tides />
  <!--More components go below-->
</main>
  
<style>
  main{
    padding-top: 2em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  /*Global selection width for each component */
  :global(section){
    width: 350px;
    box-shadow: rgba(0, 0, 0, 0.35) 0.2em 0.5em 1em;
    border-radius: 0.5em;
    padding: 2em;
  }
  :global(body){
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0px;
    margin: 0px;
}
</style>
