<script>
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { page } from "$app/stores";

  let dropdownMenu;
  let dropdownDisplayed = false;

  const isLoginPage = derived(page, $page => $page.url.pathname === '/login');


  import AgencySelect from "$lib/AgencySelect.svelte";
  import PageSelect from "$lib/PageSelect.svelte";
  import DarkModeButton from "./DarkModeButton.svelte";
  import LogoutButton from "./LogoutButton.svelte";

  function displayMenu() {
    dropdownDisplayed = true;
    dropdownMenu.style.display =
      dropdownMenu.style.display === "flex" ? "none" : "flex";
  }

  function hideDropdown(event) {
    if (
      dropdownDisplayed &&
      !dropdownMenu.contains(event.target) &&
      event.target.id != "hamburger"
    ) {
      dropdownMenu.style.display = "none";
      dropdownDisplayed = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", hideDropdown);
  });
</script>

<header class="flex justify-center items-center sticky top-0 z-[1000] p-2 bg-white shadow-md">
  <h1 class="text-center text-xl uppercase underline tracking-widest drop-shadow-xl h-[3em] flex items-center justify-center bg-white w-[20em] shadow-[3px_3px_3px] m-4">
    <a href="/" class="text-darkgrey no-underline">Disaster Management System</a>
  </h1>

<nav class="flex items-center">
    <ul class="hidden lg:flex items-center space-x-4 text-base">
      {#if !$isLoginPage}
        <li><AgencySelect /></li>
        <li><PageSelect /></li>
        <li><DarkModeButton /></li>
        <li><LogoutButton /></li>
      {/if}
    </ul>

    <!-- Hamburger menu icon (visible below lg) -->
    <ul class="flex lg:hidden ml-4">
      <li>
        <button
          id="hamburger"
          on:click={displayMenu}
          class="text-3xl text-black cursor-pointer hover:text-gray-700"
        >
          ☰
        </button>
      </li>
    </ul>
  </nav>

  <!-- Dropdown menu for mobile/small screens -->
  <nav
    id="dropdown-menu"
    bind:this={dropdownMenu}
    class="hidden absolute top-[10em] left-[1em] w-[18em] bg-[#333] text-white rounded-lg border-4 border-black shadow-[3px_3px_10px_black] z-[1001]"
  >
    <ul class="flex flex-col space-y-2 p-4 text-sm">
      <li><AgencySelect /></li>
      <li><PageSelect /></li>
      <li><DarkModeButton /></li>
      <li><LogoutButton /></li>
    </ul>
  </nav>
</header>

<style>
  #dropdown-menu {
    display: none;
  }

  button {
    padding: 0;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-weight: bolder;
    font-size: inherit;
    color: white;
    cursor: pointer;
  }

  #hamburger:hover {
    color: #333;
  }
</style>
