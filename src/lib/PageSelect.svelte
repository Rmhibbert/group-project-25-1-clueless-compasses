<script>
	import { goto } from '$app/navigation';

	function navigate(event) {
		const page = event.target.value;
		if (page === 'home') {
			goto('/');
		} else {
			goto(`/${page}`);
		}
	}
</script>

<select on:change={navigate} class="dropdown">
	<option value="home">Home</option>
	<option value="login">Login</option>
	<option value="hazard">Hazard Reporting</option>
	<option value="contact">Contact Us</option>
</select>



<style>
    .dropdown {
        padding: 0.6em 1em 0.6em 1em;
        font-family: inherit;
        font-size: inherit;
        font-weight: bolder;
        background-color: #333;
        color: white;
        cursor: pointer;
        outline: none; 
        border-top: 2px solid #535353;
        border-left: 2px solid #535353;
        border-bottom: 2px solid black;
        border-right: 2px solid black;
    }
    
    :global(body.dark) .dropdown {
        background-color: white;
        color: #333;
    }
    </style>


    