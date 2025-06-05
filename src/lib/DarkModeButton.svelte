<script>
  import { onMount } from 'svelte';

  let dark = false;

  onMount(() => {
    // Safe: runs only in browser
    dark = document.body.classList.contains("dark");
  });

  function toggle() {
    dark = !dark;

    const method = dark ? 'add' : 'remove';

    document.body.classList[method]('dark');
    document.getElementById('main')?.classList[method]('dark');
    document.querySelector('header')?.classList[method]('dark');
    document.querySelector('footer')?.classList[method]('dark');
  }
</script>

<button
  class="dropdown px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer outline-none border-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black min-w-[10em] whitespace-nowrap text-sm md:text-base"
  on:click={toggle}
>
  {#if dark}
    ☀️ Light Mode
  {:else}
    🌙 Dark Mode
  {/if}
</button>
