<script>
import { onMount } from "svelte";

    let entry = "";
    let agency = "";
    let severity = "";
    let status = "";
    let contactInfo = "";
    let hazards = [];
    let source="";

    let isFetching = true;
    let isSubmitting = false;
    let error = null;

    // Please change me for production & merging into staging (if api branch is up to date)
    const API_URL = "https://staging-group-project-25-1-clueless.onrender.com/api/v1/hazards";

 // Fetch hazards on mount
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
                hazards = result.data.map((h) => ({
                    ...h,
                    entry: h.RelevantDetails, // map RelevantDetails → entry
                }));
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
  <h1 class="text-2xl font-bold mb-4">
    Latest Reported Hazards To Responders
  </h1>
  
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
            <summary class="cursor-pointer text-lg font-semibold">{hazard.entry}</summary>
            <div class="mt-2 text-sm space-y-2">
              <p><strong >Agency:</strong> {hazard.agency}</p>
              <p><strong>Severity:</strong> {hazard.severity}</p>
              <p><strong>Status:</strong> {hazard.status}</p>
              <p><strong>Address:</strong> {hazard.address}</p>
              <p><strong>Contact Info:</strong> {hazard.contactInfo}</p>
              <p><strong>Source:</strong> {hazard.source}</p>
              <small><strong>Time: </strong></small>
            </div>
          </details>
        {/each}
      {/if}
</section>
 


