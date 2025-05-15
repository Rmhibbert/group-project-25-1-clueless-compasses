<script>
    let dark;
    function toggle() {
        dark = !dark;
        const content = document.getElementById('content');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (dark) {
            document.body.classList.add('dark');
            content.classList.add('dark');
            header.classList.add('dark');
            footer.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            content.classList.remove('dark');
            header.classList.remove('dark');
            footer.classList.remove('dark');
        }
    }
</script>
<button class="dropdown px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-t-[2px] border-l-[2px] border-b-[2px] border-r-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black"
on:click={toggle}>
    {#if dark }
    ☀️ Light Mode
    {:else}
    🌙 Dark Mode
    {/if}
</button>
