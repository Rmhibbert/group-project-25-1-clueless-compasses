<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Metservice from "$lib/Metservice.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Volcano from "$lib/Volcano.svelte";
  import Tides from "$lib/Tides.svelte";
  import Map from "$lib/Map.svelte";
  import ContactUs from "$lib/ContactUs.svelte";
  import { selectedAgency } from "$lib/stores.js";
  import CurrentEvents from "$lib/CurrentEvents.svelte";
  import NZTACameras from "$lib/NZTACameras.svelte";
  import RssEmergencyAlerts from "$lib/RSSEmergencyAlerts.svelte";
  import ReportedHazards from "$lib/ReportedHazards.svelte";
  import { currentPage } from "$lib/stores.js";

  $currentPage='home';

  let groupedCameras = {};
  let fullAlertDetails = [];
  let loading = true;

  onMount(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No Token Detected, Redirecting to Login Page');
      goto('/login');
      return;
    }

    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      groupedCameras = json.groupedCameras;
      fullAlertDetails = json.fullAlertDetails;
    } catch (error) {
      console.error('Failed to fetch emergency data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<!-- Drop down for selecting agency specific view -->


  <!-- Main content area -->
  <main class="flex-1 pt-4 px-6 flex justify-center flex-wrap gap-10">
    {#if $selectedAgency === "FENZ"}
      <Metservice />
      <RssEmergencyAlerts />
      <ContactUs />
    {:else if $selectedAgency === "GeoNet"}
      <GeoNet />
      <Volcano />
      <CurrentEvents />
      <ContactUs />
    {:else if $selectedAgency === "USAR"}
      <Metservice />
      <GeoNet />
      <Volcano />
      <CurrentEvents />
      <ContactUs />
    {:else}
      <!-- Displays all -->
      <ReportedHazards />
      <Metservice />
      <GeoNet />
      <Volcano />
      <Map />
      <RssEmergencyAlerts {fullAlertDetails} />
      <Tides />
      <NZTACameras {groupedCameras} />
    {/if}
  </main>