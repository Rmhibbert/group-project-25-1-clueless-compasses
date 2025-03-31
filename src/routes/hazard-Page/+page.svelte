<script>
    import AddressLookup from "../../lib/AddressLookup.svelte";
    import { hazardAddress } from '$lib/stores.js';
    import { searchQuery } from '$lib/stores.js';

    let entry = "";
    let address = "";
    let agency = "";
    let hazards = [];
    
    function addHazard() {
        if (entry.trim() !== "") {
            hazards = [
                {
                    entry: entry,
                    address: $hazardAddress, 
                    agency: agency
                },
                ...hazards // Adds newest hazard to the top without replacing the whole list
            ];
            entry = ""; 
            address = ""; 
            agency = ""; 
            hazardAddress.set(""); 
            searchQuery.set("");
        }
    }
</script>

<main class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 text-center ">Reported Hazards</h1>


    <div class="flex gap-6">
        <!-- Known Hazards  -->
        <div class="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 class="text-2xl font-semibold mb-4 text-gray-800">Known Hazards and Risks</h1>
            {#each hazards as hazard}
                <details class="mb-3 border border-gray-300 rounded-lg bg-gray-50 p-4 transition-shadow hover:shadow-md">
                    <summary class="cursor-pointer text-lg font-medium text-gray-900">
                        {hazard.entry}
                    </summary>
                    <div class="mt-2 text-gray-700">
                        <p><span class="font-semibold">Address:</span> {hazard.address}</p>
                        <p><span class="font-semibold">Agency:</span> {hazard.agency}</p>
                    </div>
                </details>
            {/each}
        </div>
        

        <!-- Log New Hazard  -->
        <div class="w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 class="text-lg font-semibold mb-3">Log a New Hazard</h1>

            <h2 class="text-sm font-medium mb-2">What agency does this affect?</h2>
            <select bind:value={agency} class="w-full p-2 border rounded-md mb-3">
                <option value="">All</option>
                <option value="USAR">USAR</option>
                <option value="FENZ">FENZ</option>
                <option value="Geonet">Geonet</option>
            </select>

            <h2 class="text-sm font-medium mb-2">Approximate address</h2>
            <AddressLookup bind:value={$hazardAddress} />

            <h2 class="text-sm font-medium mb-2">Relevant details</h2>
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



