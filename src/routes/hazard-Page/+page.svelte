<script>
import AddressLookup from "../../lib/AddressLookup.svelte";
import { hazardAddress } from '$lib/stores.js';
    let entry = "";
    let address ="";
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
                <details>
                    <summary>
                        <li class="p-2 bg-white border-l-4 border-red-500 rounded-md shadow">
                            {hazard}
                        </li>
                    </summary>
                    <p>Address: {$hazardAddress }</p>
                </details>

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

            <h2 class="text-sm font-medium mb-2">Approximate address</h2>

            <AddressLookup />
    
            
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


