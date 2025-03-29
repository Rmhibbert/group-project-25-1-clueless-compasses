<script>

  import { onMount } from "svelte";

  let password = '';
  let username = '';


  function  enterData()
  {

  }

  function clearData ()
  {

  }





</script>

<p>Username</p>
<input
  id="name"
  type="text"
  placeholder="Please enter your username"
  bind:value={username}
  />
<p>Password</p>
<input
  id="password"
  type="text"
  placeholder="Please enter your password"
  bind:value={password}
/>
<p>Phone Number</p>


<button class="submit" on:click={enterData}>Click here to Submit your Data</button>


<button class="clear" on:click={clearData}>Click here to clear your Data.</button>


<style>

</style>