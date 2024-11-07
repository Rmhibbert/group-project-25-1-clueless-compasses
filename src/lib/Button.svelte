<script>
    let dark;
    function toggle() {
        dark = !dark;
        const sections = document.querySelectorAll('section');
        const header = document.querySelector('header');

        if (dark) {
            document.body.classList.add('dark');
            sections.forEach(section => section.classList.add('dark'));
            header.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            sections.forEach(section => section.classList.remove('dark'));
            header.classList.remove('dark');
        }
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