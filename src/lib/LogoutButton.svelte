<script>
    // Only execute client-side code if we are in the browser
    let token;
  
    if (typeof window !== 'undefined') {
      // Get the current token if available from localStorage
      token = localStorage.getItem('token');
    }
  
    async function Logout() {
      if (token) {
        try {
          const res = await fetch('https://staging-group-project-25-1-clueless.onrender.com/api/v1/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (res.ok) {
            console.log("Token blacklisted successfully.");
          } else {
            console.error("Failed to blacklist token.");
          }
        } catch (err) {
          console.error("Error occurred while blacklisting token:", err);
        }
  
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          console.log("User logged out and token removed.");
        }
  
        window.location.href = '/login'; 

      }
    }
  </script>
  
  <button class="logout-button" on:click={Logout}>
    Logout
  </button>
  
  <style>
    .logout-button {
      padding: 0.6em 1em;
      font-family: inherit;
      font-size: inherit;
      font-weight: bolder;
      background-color: #333;
      color: white;
      cursor: pointer;
      border: black;
      border-top: 2px solid #535353;
      border-right: 2px solid black;
      border-bottom: 2px solid black;
      border-left: 2px solid #535353;
      width: 7em;
    }
  
    :global(body.dark) button {
      background-color: white;
      color: #333;
    }
  </style>
  