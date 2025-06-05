<script>
  import imageCompression from "browser-image-compression";
  import AddressLookup from "../../lib/AddressLookup.svelte";
  import { hazardAddress, searchQuery } from "$lib/stores.js";
  import { onMount } from "svelte";

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
<h1
  class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 p-1 text-center"
>
  Incident Log
</h1>

<main class="flex p-3">
  <!-- First Section -->
  <div class="w-1/2 p-2 m-2 border rounded-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-3">Incidents</h2>
  </div>

  <!-- Second Section -->
  <div class="w-1/2 p-2 m-2 border rounded-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-3">Incident Report</h2>

    <label class="m-3 grid text-sm font-medium" for="Description">
      Description of incident
      <input
        type="text"
        bind:value={description}
        placeholder="Enter Description"
        class="border rounded-md mt-1 p-1 bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        required
      />
    </label>

    <label class="m-3 grid text-sm font-medium" for="Cause">
      Cause of incident
      <input
        type="text"
        bind:value={cause}
        placeholder="Enter Cause"
        class="border rounded-md mt-1 p-1 bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
      />
    </label>
    <label class="m-3 grid text-sm font-medium" for="address-input-id">
      <span class="text-sm font-medium">Approximate Address</span>
      <div class="rounded-md mt-1">
        <AddressLookup
          id="address-input-id"
          bind:value={$hazardAddress}
          class="dark:bg-gray-800 dark:text-white"
        />
      </div>
    </label>

    <label class="m-3 grid text-sm font-medium " for="Date">
      Date of recording
      <input type="datetime-local" bind:value={recordedAt} required />
    </label>
    <label class="m-3 grid text-sm font-medium" for="Photo">
      Upload a photo

      {#if avatar}
        <img src={avatar} alt="User Upload" />
      {:else}
        <img src="" alt="" />
      {/if}
      <button
        class="bg-gray-50 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition border rounded-md m-2 p-1 cursor-pointer"
        on:click={() => {
          fileinput.click();
        }}>Upload</button>

      <button>
        {#if isSubmitting}Submitting...{:else}Submit Incident{/if}
      </button>
    </form>
  </div>


</main>