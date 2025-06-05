<script>
  // Only execute client-side code if we are in the browser
  let token;

  if (typeof window !== "undefined") {
    // Get the current token if available from localStorage
    token = localStorage.getItem("token");
  }

  const API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}/api/v1/auth/logout`
    : "http://localhost:3000/api/v1/auth/logout";

  async function Logout() {
    if (token) {
      try {
        const res = await fetch(
          API_URL,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          console.log("Token blacklisted successfully.");
        } else {
          console.error("Failed to blacklist token.");
        }
      } catch (err) {
        console.error("Error occurred while blacklisting token:", err);
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        console.log("User logged out and token removed.");
      }

      window.location.href = "/login";
    }
  }
</script>

<button
  on:click={Logout}
  class="w-full px-4 py-[0.6em] font-bold bg-[#333] text-white cursor-pointer border-[2px] border-t-[#535353] border-l-[#535353] border-b-black border-r-black text-sm md:text-base"
>
  Logout
</button>

<style>

  :global(body.dark) button {
    background-color: white;
    color: #333;
  }
</style>
