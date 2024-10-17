<script>
  import Navigation from "$lib/Navigation.svelte";
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import Footer from "$lib/Footer.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Tides from '$lib/Tides.svelte';
  import DisasterForm from "../lib/DisasterForm.svelte";
</script>
<Navigation />

<main>
  <Metservice />
  
  <CivilDefence /> 
  <GeoNet />
  <Tides />
  <DisasterForm />
  <!--More components go below-->

</main>
  <Footer />
<style>
  :global(*) {
    font-family: sans-serif;
  }

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
    border: 1px ridge #333;
  }
</style>
