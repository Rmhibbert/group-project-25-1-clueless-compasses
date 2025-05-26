<script>
  import imageCompression from "browser-image-compression";
  import AddressLookup from "../../lib/AddressLookup.svelte";
  import { hazardAddress, searchQuery } from "$lib/stores.js";
  let avatar, fileinput;

  let description = "";
  let cause = "";
  let recordedAt = "";
  let imageFile = null;
  let preview = null;


  async function onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
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
  }

  async function submitForm() {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("cause", cause);
      formData.append("address", $hazardAddress);
      formData.append("recordedAt", recordedAt);
      if (imageFile) {
        formData.append("photo", imageFile);
      }
      const res = await fetch("http://localhost:3000/api/v1/incidents", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Incident logged:", data);
      console.log(
        "Server message:",
        data.message || data.error?.message || data.error
      );

      // Clear form
      description = "";
      cause = "";
      hazardAddress.set("");
      recordedAt = "";
      imageFile = null;
      preview = null;
      fileinput.value = null;
    } catch (error) {
      console.error("Error submitting form:", error);
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
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-3">Incidents</h2>
  </div>

  <!-- Second Section -->
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-3">Incident Report</h2>

    <label class="m-3 grid text-sm font-medium" for="Description">
      Description of incident
      <input
        type="text"
        bind:value={description}
        placeholder="Enter Description"
        class="border rounded-md mt-1 p-1"
        required
      />
    </label>

    <label class="m-3 grid text-sm font-medium" for="Cause">
      Cause of incident
      <input
        type="text"
        bind:value={cause}
        placeholder="Enter Cause"
        class="w-full p-2 border rounded-md bg-white text-gray-800"
      />
    </label>
    <label class="m-3 grid text-sm font-medium" for="address-input-id">
      <span class="text-sm font-medium">Approximate Address</span>
      <div class="rounded-md mt-1">
        <AddressLookup
          id="address-input-id"
          bind:value={$hazardAddress}
          class="w-full"
        />
      </div>
    </label>

    <label class="m-3 grid text-sm font-medium" for="Date">
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
        class="bg-gray-50 hover:bg-gray-300 transition border rounded-md m-2 p-1 cursor-pointer"
        on:click={() => {
          fileinput.click();
        }}>Upload</button
      >
      <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
      />
    </label>

    <button
      on:click={submitForm}
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >Submit Incident</button
    >
  </div>

  <!-- Third Section -->
  <div class="w-1/3 p-2 m-2 border rounded-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-3">Locations already logged</h2>
  </div>
</main>

<style>
</style>
