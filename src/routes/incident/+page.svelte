<script>
  import imageCompression from "browser-image-compression";
  import AddressLookup from "../../lib/AddressLookup.svelte";
  import { hazardAddress, searchQuery, currentPage } from "$lib/stores.js";
  import { onMount } from "svelte";

  $currentPage = 'incident';

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

  const BASE_API_URL = import.meta.env.VITE_DEPLOYED_API_URL || "http://localhost:3000";
  const API_URL = `${BASE_API_URL}/api/v1/incidents`;

  onMount(fetchIncidents);

  async function fetchIncidents() {
    isFetching = true;
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const result = await res.json();
      incidents = Array.isArray(result.data) ? result.data : [];
    } catch (err) {
      error = `Failed to load incidents: ${err.message}`;
      incidents = [];
    } finally {
      isFetching = false;
    }
  }

  async function onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    });
    imageFile = compressed;
    const reader = new FileReader();
    reader.onload = (e) => avatar = e.target.result;
    reader.readAsDataURL(compressed);
  }

  async function submitForm() {
    isSubmitting = true;
    error = null;
    try {
      if (!description || !recordedAt || !$hazardAddress.trim()) {
        error = "Description, Address, and Date are required.";
        return;
      }
      const formData = new FormData();
      formData.append("description", description);
      formData.append("cause", cause);
      formData.append("source", source);
      formData.append("address", $hazardAddress);
      formData.append("recordedAt", recordedAt);
      if (imageFile) formData.append("photo", imageFile);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      await fetchIncidents();
      // Clear form
      description = cause = source = recordedAt = "";
      hazardAddress.set("");
      imageFile = avatar = null;
      if (fileinput) fileinput.value = null;
    } catch (err) {
      error = err.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<main class="flex p-3 h-screen">
  <!-- Incident List -->
  <div class="w-1/2 p-2 m-2 border rounded-md text-gray-800 dark:text-white flex flex-col">
    <h2 class="text-2xl font-semibold mb-3">Incidents</h2>
    <div class="overflow-y-auto flex-grow pr-2">
      {#if isFetching}
        <p class="text-gray-600 dark:text-gray-300">Loading...</p>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {:else if incidents.length === 0}
        <p class="text-gray-600 dark:text-gray-300">No incidents reported.</p>
      {:else}
        {#each incidents as incident}
          <details class="mb-3 border rounded-lg p-4">
            <summary class="text-lg font-medium">{incident.description}</summary>
            <div class="mt-2 text-sm">
              <p><strong>Cause:</strong> {incident.cause || "N/A"}</p>
              <p><strong>Source:</strong> {incident.source || "N/A"}</p>
              <p><strong>Address:</strong> {incident.address || "N/A"}</p>
              <p><strong>Recorded:</strong> {new Date(incident.recordedAt).toLocaleString()}</p>
              {#if incident.photoUrl}
                <img src={`${BASE_API_URL}${incident.photoUrl}`} alt="Incident photo" class="mt-2 w-48 rounded border" />
              {/if}
            </div>
          </details>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Form -->
  <div class="w-1/2 p-2 m-2 border rounded-md text-gray-800 dark:text-white overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-3">Report Incident</h2>

    {#if error}
      <p class="text-red-700 bg-red-100 border border-red-400 p-3 rounded mb-4 text-sm dark:bg-red-900 dark:text-red-100">{error}</p>
    {/if}
    {#if isSubmitting}
      <p class="text-blue-700 bg-blue-100 border border-blue-400 p-3 rounded mb-4 text-sm dark:bg-blue-900 dark:text-blue-100">Submitting...</p>
    {/if}

    <form on:submit|preventDefault={submitForm} class="space-y-4">
      <label class="block text-sm font-medium">
        Description
        <input
          type="text"
          bind:value={description}
          placeholder="Description"
          class="w-full p-2 mt-1 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />
      </label>

      <label class="block text-sm font-medium">
        Cause
        <input
          type="text"
          bind:value={cause}
          placeholder="Cause"
          class="w-full p-2 mt-1 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        />
      </label>

      <label class="block text-sm font-medium">
        Source
        <input
          type="text"
          bind:value={source}
          placeholder="Source"
          class="w-full p-2 mt-1 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        />
      </label>

      <label class="block text-sm font-medium">
        Address
        <AddressLookup
          bind:value={$hazardAddress}
          class="w-full p-2 mt-1 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        />
      </label>

      <label class="block text-sm font-medium">
        Date
        <input
          type="datetime-local"
          bind:value={recordedAt}
          class="w-full p-2 mt-1 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />
      </label>

      <label class="block text-sm font-medium">
        Photo
        <div class="flex flex-col items-center gap-2 mt-2">
          {#if avatar}
            <img src={avatar} alt="Preview" class="w-48 rounded border" />
          {/if}
          <button
            type="button"
            on:click={() => fileinput.click()}
            class="bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Choose File
          </button>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            style="display: none"
            bind:this={fileinput}
            on:change={onFileSelected}
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {#if isSubmitting}Submitting...{:else}Submit Incident{/if}
      </button>
    </form>
  </div>
</main>
