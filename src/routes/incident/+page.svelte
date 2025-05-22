<script>
  import imageCompression from "browser-image-compression";

  let avatar, fileinput;
  let description = "";
  let cause = "";
  let suburb = "";
  let street = "";
  let buildingNumber = "";
  let recordedAt = "";

  let imageFile = null;
  let preview = null;

  // Fix runtime errors
  let showField = true;
  let showField2 = true;

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
      preview = e.target.result;
    };
    reader.readAsDataURL(compressed);
  }

  async function submitForm() {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("cause", cause);
      formData.append("suburb", suburb);
      formData.append("street", street);
      formData.append("buildingNumber", buildingNumber);
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
      console.log("Server message:", data.message || data.error?.message || data.error);


      // Clear form
      description = "";
      cause = "";
      suburb = "";
      street = "";
      buildingNumber = "";
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
  <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
    <h2>Incidents</h2>
  </div>

  <!-- Second Section -->
  <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md grid">
    <h2 class="mt-3 ml-3">Incident Report</h2>

    <label class="m-3 grid" for="Description">
      Description of incident
      <input
        type="text"
        bind:value={description}
        placeholder="Enter Description"
        class="border rounded-md mt-1 p-1"
        required
      />
    </label>

    <label class="m-3 grid" for="Cause">
      Cause of incident
      <input
        type="text"
        bind:value={cause}
        placeholder="Enter Cause"
        class="border rounded-md mt-1 p-1"
      />
    </label>

    <div class="m-3 grid">
      <label for="triggerInput" class="block text-sm font-medium text-gray-700"
        >Suburb</label
      >
      <input
        type="text"
        id="triggerInput"
        bind:value={suburb}
        class="border rounded-md mt-1 p-1"
        placeholder="Enter Suburb"
      />
    </div>

    {#if showField}
      <div class="m-3 grid">
        <label for="hiddenField" class="block text-sm font-medium text-gray-700"
          >Street</label
        >
        <input
          type="text"
          id="hiddenField"
          bind:value={street}
          class="border rounded-md mt-1 p-1"
          placeholder="Enter Street"
        />
      </div>
    {/if}

    {#if showField2}
      <div class="m-3 grid">
        <label for="hiddenField" class="block text-sm font-medium text-gray-700"
          >Closest building number</label
        >
        <input
          type="text"
          bind:value={buildingNumber}
          class="border rounded-md mt-1 p-1"
          placeholder="Enter Closest Building Number"
        />
      </div>
    {/if}

    <label class="m-3 grid" for="Date">
      Date of recording
      <input type="datetime-local" bind:value={recordedAt} required />
    </label>

    <label class="m-3 grid" for="Photo">
      Upload a photo

      {#if preview}
        <img src={preview} alt="Preview" class="max-h-48 object-contain" />
      {:else}
        <p class="text-sm text-gray-400">No image selected</p>
      {/if}
      <button
        type="button"
        class="bg-gray-50 hover:bg-gray-300 transition border rounded-md m-2 p-1 cursor-pointer"
        on:click={() => fileinput.click()}
      >
        Upload
      </button>
      <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={onFileSelected}
        bind:this={fileinput}
      />
    </label>

    <button
      on:click={submitForm}
      class="bg-gray-50 hover:bg-blue-300 transition border rounded-md m-2 p-1 cursor-pointer"
    >
      Submit
    </button>
  </div>

  <!-- Third Section -->
  <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
    <h2>Locations already logged</h2>
  </div>
</main>

<style>
</style>
