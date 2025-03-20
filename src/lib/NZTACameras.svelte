<script>
    export let data;

    // Initialize otagoCameras only when data is available
    let otagoCameras = data ? data.groupedCameras.Otago : [];
    console.log(data.groupedCameras.Otago);
    let selectedCameraId = null;
    let selectedCamera = null;

    // Find the selected camera based on the ID
    $: selectedCamera = otagoCameras.find(
        (camera) => camera.id === selectedCameraId,
    );
</script>

<section>
    <h2 class="text-2xl font-bold mb-2">NZTA Traffic Camera</h2>

    <select
        bind:value={selectedCameraId}
        class="mb-2 w-fit p-1 mt-2 rounded bg-white text-gray-800 border cursor-pointer focus:outline-none focus:ring- focus:ring-blue-500"
    >
        <option value="" disabled>Select a camera</option>

        {#each otagoCameras as camera}
            <option value={camera.id}>{camera.name}</option>
        {/each}
    </select>

    {#if selectedCamera}
        <div>
            <img
                src={selectedCamera.imageUrl}
                alt={selectedCamera.name || "Image Loading"}
            />
            <p>{selectedCamera.description}</p>
        </div>
    {:else}
        <p class=" text-tex font-bold">Please select a traffic camera from above</p>
    {/if}
</section>
