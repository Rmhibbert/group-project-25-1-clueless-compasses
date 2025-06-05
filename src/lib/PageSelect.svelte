<script>
    import { selectedPage } from "$lib/stores.js";
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';

    function PageChange() {
    const route = get(selectedPage);
    goto(`/${route}`);
  }
</script>

<!-- Binds menu value to a variable, then passes that variable to a function that converts it to a url -->
<select
  bind:value={$selectedPage}
  on:change={PageChange}
  class="w-full text-center dropdown px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-t-[2px] border-l-[2px] border-b-[2px] border-r-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black"
>
  <option value="">Home</option>
  <option value="hazard">Hazard Reporting</option>
  <option value="incident">Incident Reporting</option>
</select>


    