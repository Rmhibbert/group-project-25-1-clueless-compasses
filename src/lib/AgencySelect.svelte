<script>
    import { selectedAgency } from "$lib/stores.js";
</script>

<select bind:value={$selectedAgency} class="dropdown">
    <option value="All">🌍 All</option>
    <option value="FENZ">🚒 FENZ</option>
    <option value="GeoNet">🌋 GeoNet</option>
    <option value="USAR">🦺 USAR</option>
</select>

<style>
    .dropdown {
        padding: 0.6em 1em 0.6em 1em;
        font-family: inherit;
        font-size: inherit;
        font-weight: bolder;
        background-color: #333;
        color: white;
        cursor: pointer;
    }

    :global(body.dark) .dropdown{
        background-color: white;
        color: #333;
    }

    /* Focus effect */
    .dropdown:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
</style>
