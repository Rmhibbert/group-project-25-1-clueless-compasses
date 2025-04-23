<script>
    import { selectedPage } from "$lib/stores.js";
</script>

<select bind:value={$selectedPage} class="px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-t-[2px] border-l-[2px] border-b-[2px] border-r-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black"
>
    <option value="Login">Login</option>
    <option value="Home">Home</option>
    <option value="Hazard">Harzard Reporting</option>
    <option value="Contact">Contact Us</option>
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
        outline: none; 
        border-top: 2px solid #535353;
        border-left: 2px solid #535353;
        border-bottom: 2px solid black;
        border-right: 2px solid black;
    }
    
    :global(body.dark) .dropdown {
        background-color: white;
        color: #333;
    }
    </style>
    