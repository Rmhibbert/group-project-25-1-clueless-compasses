<script>
    let entry = "";
    let region ="";
    let hazards = [];

    function addHazard() {
        if (entry.trim() !== "") {
            hazards = [entry, ...hazards]; //Adds newest hazard to the top withput replacing whole list
            entry1 = ""; 
        }
    }
</script>

<main class="p-6">

    <div class="flex gap-6">
        <!-- Known Hazards  -->
        <div class="w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 class="text-xl font-bold mb-2">Known Hazards and Risks</h1>
            <ul class="space-y-2">
                {#each hazards as hazard}
                    <li class="p-2 bg-white border-l-4 border-red-500 rounded-md shadow">
                        {hazard}
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Log New Hazard  -->
        <div class="w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 class="text-lg font-semibold mb-3">Log a New Hazard</h1>

            <h2 class="text-sm font-medium mb-2">What agency does this affect?</h2>
            <select class="w-full p-2 border rounded-md mb-3">
                <option value="">All</option>
                <option value="">USAR</option>
                <option value="">FENZ</option>
                <option value="">Geonet</option>
            </select>

            <h2 class="text-sm font-medium mb-2">Select region</h2>
            <select class="w-full p-2 border rounded-md mb-3">
                <option value="">All</option>
                <option value="northland">Northland</option>
                <option value="auckland">Auckland</option>
                <option value="waikato">Waikato</option>
                <option value="bay_of_plenty">Bay of Plenty</option>
                <option value="gisborne">Gisborne</option>
                <option value="hawkes_bay">Hawke's Bay</option>
                <option value="taranaki">Taranaki</option>
                <option value="manawatu_wanganui">Manawatu-Wanganui</option>
                <option value="wellington">Wellington</option>
                <option value="tasman">Tasman</option>
                <option value="nelson">Nelson</option>
                <option value="marlborough">Marlborough</option>
                <option value="west_coast">West Coast</option>
                <option value="canterbury">Canterbury</option>
                <option value="otago">Otago</option>
                <option value="southland">Southland</option>
            </select>
            

            <textarea 
                bind:value={entry} 
                placeholder="Enter details here..." 
                class="w-full p-2 border rounded-md mb-3"
            ></textarea>

            <button 
                on:click={addHazard} 
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Submit Hazard
            </button>
        </div>
    </div>
</main>


