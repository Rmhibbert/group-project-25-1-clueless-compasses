<script>
let dark = false;
function toggle(){
    dark = !dark;
    window.document.body.classList.toggle('dark');
}
</script>
<button on:click={toggle}>
    {#if dark }
        Light Mode
    {:else}
        Dark Mode
    {/if}
</button>
<style>
    button{
        padding: 0.6em 1em 0.6em 1em;
        font-family: inherit;
        font-size: inherit;
        font-weight: bolder;
        background-color: #333;
        color: white;
    }
    :global(body.dark) button{
        background-color: white;
        color: #333;
    }
</style>