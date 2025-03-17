<script>
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Volcano from "$lib/Volcano.svelte";
  import Tides from "$lib/Tides.svelte";
  import CommunityMember from "$lib/CommunityMember.svelte";
  import AlertsRss from "$lib/AlertsRSS.svelte";
  import Map from "$lib/Map.svelte";
  import ContactUs from '$lib/ContactUs.svelte';
  import { selectedAgency } from '$lib/stores.js';
 


</script>

<!-- Drop down for selecting agency specific view -->

<main class="pt-2 flex justify-center flex-wrap gap-10">
  
  {#if $selectedAgency === "FENZ"}
    <Metservice />
    <AlertsRss />
    <ContactUs />
  {:else if $selectedAgency === "GeoNet"}
    <GeoNet />
    <Volcano />
    <ContactUs />
  {:else if $selectedAgency === "USAR"}
    <Metservice />
    <GeoNet />
    <Volcano />
    <ContactUs />
  {:else}
    <!-- Displays all -->
    <Metservice />
    <GeoNet />
    <Volcano />
    <Map />
    <AlertsRss />
    <Tides />
    <CivilDefence />
    <CommunityMember/>
  {/if}
</main>