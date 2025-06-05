<script>
    import { selectedAgency } from "$lib/stores.js";
</script>

<!-- Dropdown to show specific information -->
<select
  bind:value={$selectedAgency}
  class="w-full text-center  dropdown px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-t-[2px] border-l-[2px] border-b-[2px] border-r-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black"
>
  <option value="All">🌍 All</option>
  <option value="FENZ">🚒 FENZ</option>
  <option value="GeoNet">🌋 GeoNet</option>
  <option value="USAR">🦺 USAR</option>
</select>
