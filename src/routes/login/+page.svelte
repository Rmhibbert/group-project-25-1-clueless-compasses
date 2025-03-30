<script>
  import { onMount } from "svelte";

  let password = '';
  let username = '';

  function enterData() {
  }

  function clearData() {
    username = '';
    password = '';
  }

  onMount(() => {
  });
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="login-box bg-gradient-to-r from-[#053a78] via-[#1d73a8] to-[#00d4ff] p-8 rounded-lg shadow-[rgba(0,0,0,0.35)_0px_-50px_36px_-28px_inset] border-4 border-[#131f2a] opacity-0 transform translate-y-[-20px] animate-fadeDropIn transition-colors duration-1000 max-w-200  w-full">
    <h2 class="text-2xl font-semibold text-white text-center mb-6">Login</h2>

    <div class="mb-4">
      <label for="name" class="block text-white text-sm">Username</label>
      <input
        id="name"
        type="text"
        placeholder="Please enter your username"
        bind:value={username}
        class="w-full p-2 rounded border border-blue-300 bg-blue-200"
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-white text-sm">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Please enter your password"
        bind:value={password}
        class="w-full p-2 rounded border border-blue-300  bg-blue-200"
      />
    </div>

    <div class="flex justify-between">
      <button
        class="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        on:click={enterData}
      >
        Submit
      </button>

      <button
        class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        on:click={clearData}
      >
        Clear
      </button>
    </div>
  </div>
</div>

<style>
  @keyframes fadeDropIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Apply the custom style to the login box */
  .login-box {
    animation: fadeDropIn 1s ease-out forwards;
  }
</style>
