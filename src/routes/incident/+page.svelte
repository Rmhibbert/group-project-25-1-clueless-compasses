<script>
  import imageCompression from "browser-image-compression";
  import AddressLookup from "../../lib/AddressLookup.svelte";
  import { hazardAddress, searchQuery } from "$lib/stores.js";
  import { onMount } from "svelte";
  import { currentPage } from "$lib/stores.js";

  $currentPage='incident';

  let avatar, fileinput;
  let description = "";
  let cause = "";
  let source = "";
  let recordedAt = "";
  let imageFile = null;

  let incidents = [];
  let isFetching = true;
  let isSubmitting = false;
  let error = null;

  // API URL based on environment variable or default to local
  const BASE_API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}`
    : "http://localhost:3000";

  // Incident API endpoint
  const API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}/api/v1/incidents`
    : "http://localhost:3000/api/v1/incidents";

  onMount(() => {
    fetchIncidents();
  });

  async function fetchIncidents() {
    isFetching = true;
    error = null;
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status} - ${res.statusText}`);
      const result = await res.json();
      if (Array.isArray(result.data)) {
        incidents = result.data;
      } else {
        error = "Unexpected API format when fetching incidents.";
        incidents = [];
      }
    } catch (err) {
      console.error("Error fetching incidents:", err);
      error = `Failed to load incidents: ${err.message}`;
      incidents = [];
    } finally {
      isFetching = false;
    }
  }

  async function onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    error = null;
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      imageFile = compressed;
      const reader = new FileReader();
      reader.onload = (e) => {
        avatar = e.target.result;
      };
      reader.readAsDataURL(compressed);
    } catch (compressionError) {
      console.error("Error compressing image:", compressionError);
      error = "Failed to process image. Please try a different image or check the console.";
      imageFile = null;
      avatar = null;
      if (fileinput) fileinput.value = null;
    }
  }

  async function submitForm() {
    isSubmitting = true;
    error = null;
    try {
      if (!description.trim() || !recordedAt || !$hazardAddress.trim()) {
        error = "Description, Address, and Date of recording are required.";
        isSubmitting = false;
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("cause", cause);
      formData.append("source", source);
      formData.append("address", $hazardAddress);
      formData.append("recordedAt", recordedAt);
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(`API error: ${res.status} - ${errorData.message || res.statusText}`);
      }

      description = "";
      cause = "";
      source = "";
      hazardAddress.set("");
      recordedAt = "";
      imageFile = null;
      avatar = null;
      if (fileinput) fileinput.value = null;

      await fetchIncidents();
    } catch (err) {
      console.error("Error submitting form:", err);
      error = `Failed to submit incident: ${err.message}. Please try again.`;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Header -->

<main class="flex p-3 h-screen">
  <!-- First Section - Incidents List -->
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800 flex flex-col">
    <h2 class="text-2xl font-semibold mb-3 shrink-0">Incidents</h2>
    <div class="overflow-y-auto flex-grow pr-2">
      {#if isFetching}
        <p class="text-gray-600">Loading incidents...</p>
      {:else if error && incidents.length === 0}
        <p class="text-red-500">Could not load incidents. Check form for error messages.</p>
      {:else if incidents.length === 0}
        <p class="text-gray-600">No incidents reported yet.</p>
      {:else}
        {#each incidents as incident (incident.id || incident.description + incident.recordedAt)}
          <details class="mb-3 border border-gray-300 rounded-lg p-4">
            <summary class="text-lg font-medium cursor-pointer text-gray-800">
              {incident.description}
            </summary>
            <div class="mt-2 text-sm text-gray-700">
              <p><span class="font-semibold">Cause:</span> {incident.cause || 'N/A'}</p>
              <p><span class="font-semibold">Source:</span> {incident.source || 'N/A'}</p>
              <p><span class="font-semibold">Address:</span> {incident.address || 'N/A'}</p>
              <p><span class="font-semibold">Recorded:</span> {new Date(incident.recordedAt).toLocaleString()}</p>
              {#if incident.photoUrl}
                <img
                  src={`${BASE_API_URL}${incident.photoUrl}`}
                  alt="Incident report"
                  class="mt-2 w-48 max-w-full h-auto rounded-md border"
                />
              {/if}
            </div>
          </details>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Second Section - Incident Report Form -->
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800 overflow-y-auto"> 
    <h2 class="text-2xl font-semibold mb-3">Incident Report</h2>

    {#if error}
      <p class="text-red-700 bg-red-100 border border-red-400 p-3 rounded mb-4 text-sm">{error}</p>
    {/if}
    {#if isSubmitting && !error}
      <p class="text-blue-700 bg-blue-100 border border-blue-400 p-3 rounded mb-4 text-sm">Submitting incident...</p>
    {/if}

    <form on:submit|preventDefault={submitForm} class="space-y-4"> 
      <label class="block text-sm font-medium" for="description-input"> 
        Description of incident
        <input
          id="description-input"
          type="text"
          bind:value={description}
          placeholder="Enter Description"
          class="border rounded-md mt-1 p-2 w-full"
          required
        />
      </label>

      <label class="block text-sm font-medium" for="cause-input">
        Cause of incident
        <input
          id="cause-input"
          type="text"
          bind:value={cause}
          placeholder="Enter Cause"
          class="w-full p-2 border rounded-md bg-white text-gray-800 mt-1"
        />
      </label>

      <label class="block text-sm font-medium" for="source-input">
        Source (e.g. person who reported)
        <input
          id="source-input"
          type="text"
          bind:value={source}
          placeholder="Enter Source"
          class="w-full p-2 border rounded-md bg-white text-gray-800 mt-1"
        />
      </label>

      <label class="block text-sm font-medium" for="address-input-id">
        <span class="text-sm font-medium">Approximate Address</span>
        <div class="rounded-md mt-1">
          <AddressLookup
            id="address-input-id"
            bind:value={$hazardAddress}
            class="w-full"
            required
          />
        </div>
      </label>

      <label class="block text-sm font-medium" for="date-input">
        Date of recording
        <input id="date-input" type="datetime-local" bind:value={recordedAt} class="mt-1 p-1 border rounded-md w-full" required />
      </label>

      <label class="block text-sm font-medium w-full" for="photo-input-trigger"> 
        Upload a photo
        <div class="mt-1 mb-2 w-full">
          {#if avatar}
            <img src={avatar} alt="User Upload Preview" class="max-w-xs max-h-48 object-contain rounded border my-2 mx-auto" />
          {:else}
            <div class="w-full max-w-xs h-48 bg-gray-100 rounded border flex items-center justify-center text-gray-500 my-2 mx-auto">
              No photo selected
            </div>
          {/if}
        </div>
        <button
          id="photo-input-trigger"
          type="button"
          class="bg-gray-200 hover:bg-gray-300 transition border rounded-md p-2 cursor-pointer text-sm w-full"
          on:click={() => {
            if (fileinput) fileinput.click();
          }}
        >
          Choose Photo
        </button>
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .webp"
          on:change={onFileSelected}
          bind:this={fileinput}
          aria-labelledby="photo-input-trigger" 
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50 w-full"
      >
        {#if isSubmitting}Submitting...{:else}Submit Incident{/if}
      </button>
    </form>
  </div>

  <!-- Third Section -->
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800 overflow-y-auto"> 
    <h2 class="text-2xl font-semibold mb-3">Locations already logged</h2>
     <p class="text-gray-600">Map or further details about locations can be displayed here.</p>
     <!-- Add more content here to test scrolling if needed -->
  </div>
</main>