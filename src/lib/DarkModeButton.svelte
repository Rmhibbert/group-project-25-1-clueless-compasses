<script>
    let dark;
    function toggle() {
        dark = !dark;
        const main = document.getElementById('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (dark) {
            document.body.classList.add('dark');
            main.classList.add('dark');
            header.classList.add('dark');
            footer.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            main.classList.remove('dark');
            header.classList.remove('dark');
            footer.classList.remove('dark');
        }
    }
</script>
<button
  class="w-full dropdown pl-0 pr-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black min-w-[10em] whitespace-nowrap text-sm md:text-base"
  on:click={toggle}
>
  {#if dark}
    ☀️ Light Mode
  {:else}
    🌙 Dark Mode
  {/if}
</button>
