<script>
  import { onMount } from "svelte";

  let password = '';
  let email = '';
  let error = '';

  const API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}/api/v1/auth/login`
    : "http://localhost:3000/api/v1/auth/login";

  // Function to handle login
  async function enterData(event) {
    event.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailAddress: email, password }), // Ensure the correct field names
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';  // Redirect to home page
      } else {
        error = data.message || 'Invalid email or password.';
      }
    } catch (err) {
      error = 'An error occurred while logging in.';
      console.error(err);
    }
  }

  function clearData() {
    email = '';
    password = '';
    error = '';
  }

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Valid token found");
      window.location.href = '/';  // Redirect if already logged in
    }
  });
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="login-box bg-gradient-to-r from-[#053a78] via-[#1d73a8] to-[#00d4ff] p-8 rounded-lg shadow-[rgba(0,0,0,0.35)_0px_-50px_36px_-28px_inset] border-4 border-[#131f2a] opacity-0 transform translate-y-[-20px] animate-fadeDropIn transition-colors duration-1000 max-w-200 w-full">
    <h2 class="text-2xl font-semibold text-white text-center mb-6">Login</h2>

    {#if error}
      <div class="text-red-600 text-center mb-4">
        {error}
      </div>
    {/if}

    <!-- Form for login -->
    <form on:submit={enterData}>
      <div class="mb-4">
        <label for="name" class="block text-white text-sm">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Please enter your email"
          bind:value={email}
          class="w-full p-2 rounded border border-blue-300 bg-blue-200"
          required
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
          required
        />
      </div>

      <div class="flex justify-between">
        <button
          type="submit"
          class="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>

        <button
          type="button"
          class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          on:click={clearData}
        >
          Clear
        </button>
      </div>
    </form>
  </div>
</div>

<style>
  @keyframes fadeDropIn {
    0% {
      opacity: 0;
      transform: translateY(-150px); /* Start 20px higher */
    }
    100% {
      opacity: 1;
      transform: translateY(-100px); /* End at its normal position */
    }
  }

  /* Apply the custom style to the login box */
  .login-box {
    animation: fadeDropIn 1s ease-out forwards;
  }
</style>
