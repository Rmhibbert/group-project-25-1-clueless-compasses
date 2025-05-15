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

      <label class="m-3 grid" for="source">
        source
        <input type="text" placeholder="Enter source"
        class="border rounded-md mt-1 p-1" />
      </label>
      
        <div  class="m-3 grid">
          <label for="triggerInput" class="block text-sm font-medium text-gray-700"
            >Suburb</label
          >
          <input
            type="text"
            id="triggerInput"
            class="border rounded-md mt-1 p-1"
            bind:value={inputText}
            placeholder="Enter Suburb"
          />
        </div>
       
        {#if showField}
          <div  class="m-3 grid">
            <label for="hiddenField" class="block text-sm font-medium text-gray-700"
              >Street</label
            >
            <input
              type="text"
              id="hiddenField"
              name="hiddenField"
              class="border rounded-md mt-1 p-1"
              bind:value={inputText2}
              placeholder="Enter Street"
            />
          </div>
        {/if}

        {#if showField2}
        <div  class="m-3 grid">
          <label for="hiddenField" class="block text-sm font-medium text-gray-700"
            >Closest building number</label
          >
          <input
            type="text"
            id="hiddenField"
            name="hiddenField"
            class="border rounded-md mt-1 p-1"
            placeholder="Enter Closest Building Number"
          />
        </div>
      {/if}
     

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

      <button class="bg-gray-50 hover:bg-blue-300 transition border rounded-md m-2 p-1 cursor-pointer">submit</button>

    </div>

    
    <!-- Third Section -->
    <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
      <h2>Locations already logged</h2>
    </div>
  
</main>

<style>

</style>
