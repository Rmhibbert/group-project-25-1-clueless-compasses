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
  <h1 class="text-xl font-bold text-gray-800 mb-4">
    Latest reported hazards to responders
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
          <details class="mb-4 border border-gray-200 rounded-md p-4 bg-gray-50">
            <summary class="cursor-pointer text-base font-medium text-gray-800">
              {hazard.entry}
            </summary>
            <div class="mt-2 text-sm text-gray-700 space-y-1">
              <p><span class="font-semibold">Address:</span> {hazard.address}</p>
              <p><span class="font-semibold">Agency:</span> {hazard.agency}</p>
              <p><span class="font-semibold">Severity:</span> {hazard.severity}</p>
              <p><span class="font-semibold">Status:</span> {hazard.status}</p>
              <p><span class="font-semibold">Contact Info:</span> {hazard.contactInfo}</p>
              <p><span class="font-semibold">Source:</span> {hazard.source}</p>
            </div>
          </details>
        {/each}
      {/if}
</section>
 


