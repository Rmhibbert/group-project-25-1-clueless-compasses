<script>
  import { hazardAddress, searchQuery } from "$lib/stores.js";

  let suggestions = [];
  let debounceTimeout;

  const fetchSuggestions = () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      if ($searchQuery.length < 4) {
        suggestions = [];
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${$searchQuery}&format=json&addressdetails=1&countrycodes=NZ&limit=5`
      );
      const data = await response.json();

      suggestions = data.map(suggestion => {
        const { house_number, road, suburb, city } = suggestion.address;
        return {
          formattedAddress: `${house_number ? house_number + ' ' : ''}${road ? road + ', ' : ''}${suburb ? suburb + ', ' : ''}${city || ''}`.trim(),
          full_address: suggestion.display_name
        };
      });
    }, 500);
  };

  const selectHazard = (formattedAddress) => {
    suggestions = [];
    hazardAddress.set(formattedAddress);
    searchQuery.set(formattedAddress);
  };
</script>

<input
  type="text"
  bind:value={$searchQuery}
  on:input={fetchSuggestions}
  placeholder="Enter an address"
  aria-label="Search address"
  class="w-full p-2 mb-3 text-base border rounded bg-white text-gray-800"
/>

<ul class="list-none p-0">
  {#each suggestions as suggestion}
    <li
      on:click={() => selectHazard(suggestion.formattedAddress)}
      class="p-2 mb-1 bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
    >
      {suggestion.formattedAddress}
    </li>
  {/each}
</ul>