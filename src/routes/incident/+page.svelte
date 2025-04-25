<script>
    let avatar, fileinput;

    let inputText = "";
    let inputText2 = "";
 
 $: showField = inputText.trim().length > 0;
 $: showField2 = inputText2.trim().length > 0;

    const onFileSelected =(e)=>{
        let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                avatar = e.target.result
            };
    }
</script>

<!-- Header -->
<h1 class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 p-1 text-center">
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
          placeholder="Enter Description"
          class="border rounded-md mt-1 p-1"
          required />
      </label>

      <label class="m-3 grid" for="Cause">
        Cause of incident
        <input type="text" placeholder="Enter Cause"
        class="border rounded-md mt-1 p-1" />
      </label>

      <!-- <label class="m-3 grid" for="suburb">
        suburb
        <input type="text" placeholder="Enter suburb"
        class="border rounded-md mt-1 p-1" required />
      </label>

      <label class="m-3 grid" for="street">
        street
        <input type="text" placeholder="Enter street"
        class="border rounded-md mt-1 p-1" required />
      </label>

      <label class="m-3 grid" for="building number">
        building number
        <input type="text" placeholder="Enter building number"
        class="border rounded-md mt-1 p-1" required />
      </label> -->

      <form class="space-y-4">
        <div>
          <label for="triggerInput" class="block text-sm font-medium text-gray-700"
            >suburb</label
          >
          <input
            type="text"
            id="triggerInput"
            class="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            bind:value={inputText}
            placeholder="enter suburb"
          />
        </div>
       
        {#if showField}
          <div>
            <label for="hiddenField" class="block text-sm font-medium text-gray-700"
              >street</label
            >
            <input
              type="text"
              id="hiddenField"
              name="hiddenField"
              class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              bind:value={inputText2}
              placeholder="enter street"
            />
          </div>
        {/if}

        {#if showField2}
        <div>
          <label for="hiddenField" class="block text-sm font-medium text-gray-700"
            >closest building number</label
          >
          <input
            type="text"
            id="hiddenField"
            name="hiddenField"
            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="enter closest building number"
          />
        </div>
      {/if}
      </form>

      <label class="m-3 grid" for="Date">
        Date of recording
        <input type="datetime-local" required />
      </label>

      <label class="m-3 grid" for="Photo">
        Upload a photo
        
        {#if avatar}
        <img src="{avatar}" alt="User Upload" />
        {:else}
        <img src="" alt="" />
        {/if}
        <button class="bg-gray-50 hover:bg-gray-300 transition border rounded-md m-2 p-1 cursor-pointer" on:click={()=>{fileinput.click();}}>Upload</button>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
      </label>
    </div>

    <!-- Third Section -->
    <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
      <h2>Locations already logged</h2>
    </div>
  
</main>

<style>

</style>
