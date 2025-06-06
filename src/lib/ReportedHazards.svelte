<script>
  import { onMount } from "svelte";

  let hazards = [];
  let isFetching = true;
  let error = null;

  const API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}/api/v1/hazards`
    : "http://localhost:3000/api/v1/hazards";

  onMount(async () => {
    await fetchHazards();
  });

  async function fetchHazards() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      if (Array.isArray(result.data)) {
        hazards = result.data; // ✅ no mapping or aliasing needed
      } else {
        error = "Unexpected API format.";
      }
    } catch (err) {
      console.error("Error fetching hazards:", err);
      error = "Failed to load hazards.";
    } finally {
      isFetching = false;
    }
  }
</script>

<section>
  <h1 class="text-2xl font-bold mb-4">Latest Reported Hazards</h1>

  <!-- Hazard List -->
  {#if isFetching}
    <p class="text-gray-400">Loading hazards...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if hazards.length === 0}
    <p class="text-gray-600">No hazards reported yet.</p>
  {:else}
    {#each hazards.slice(0, 5) as hazard}
      <details class="mt-4 border p-2 rounded shadow-md">
        <summary class="cursor-pointer text-lg font-semibold">
          {hazard.relevantDetails}
        </summary>
        <div class="mt-2 text-sm space-y-2">
          <p><strong>Agency:</strong> {hazard.agency}</p>
          <p><strong>Severity:</strong> {hazard.severity}</p>
          <p><strong>Status:</strong> {hazard.status}</p>
          <p><strong>Address:</strong> {hazard.address}</p>
          <p><strong>Contact Info:</strong> {hazard.contactInfo}</p>
          <p><strong>Source:</strong> {hazard.source}</p>
          <small><strong>Time:</strong> {hazard.createdAt}</small>
        </div>
      </details>
    {/each}
  {/if}
</section>