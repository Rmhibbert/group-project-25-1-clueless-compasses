<script>
  let searchQuery = '';
  let suggestions = [];
  import { hazardAddress } from "$lib/stores.js";

  // Fetch suggestions from the Nominatim API
  const fetchSuggestions = async () => {
    if (searchQuery.length < 4) {
      suggestions = []; 
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&countrycodes=NZ&limit=5`
    );
    const data = await response.json();

    // Map over the results and format the address
    suggestions = data.map(suggestion => {
      const { house_number, road, suburb, city } = suggestion.address;
      return {
        house_number,
        road,
        suburb,
        city,
        formattedAddress: `${house_number ? house_number + ' ' : ''}${road ? road + ', ' : ''}${suburb ? suburb + ', ' : ''}${city || ''}`.trim(),
        full_address: suggestion.display_name // Store full address (or any other detail you need)
      };
    });
  };

  // Set the selected hazard address in the store and update the input
  const selectHazard = (formattedAddress) => {
    hazardAddress.set(formattedAddress); // Set the formatted address to the store
    searchQuery = formattedAddress; 
  };
</script>

<input
  type="text"
  bind:value={searchQuery}
  on:input={fetchSuggestions}
  placeholder="Enter an address"
  aria-label="Search address"
/>

<ul>
  {#each suggestions as suggestion}
    <li on:click={() => selectHazard(suggestion.formattedAddress)}>
      {suggestion.formattedAddress}
    </li>
  {/each}
</ul>

<style>
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    padding: 5px;
    background: #f4f4f4;
    border: 1px solid #ddd;
    margin-bottom: 2px;
    cursor: pointer;
  }
  li:hover {
    background-color: #f0f0f0;
  }
</style>

