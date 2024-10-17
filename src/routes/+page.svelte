<script>
  import Navigation from "$lib/Navigation.svelte";
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import Footer from "$lib/Footer.Svelte";
</script>
<Navigation />

<main>
  <Metservice />

  <CivilDefence />

  <!--More components go below-->

</main>
  <Footer />
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
    border: 1px ridge #333;
  }
</style>

