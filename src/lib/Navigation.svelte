<script>
    /*To ensure hamburger and dropdown-menu are not null*/
    import { onMount } from 'svelte';

    onMount(() => {
    const hamburger = document.getElementById('hamburger');
    const dropdownMenu = document.getElementById('dropdown-menu');

    hamburger.addEventListener("click", (e) => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    });
});
</script>

<header>    
    <h1>Disaster Management System</h1>
    <nav>
        <!--Main Items-->
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">FENZ</a></li>
            <li><a href="/">Police</a></li>
            <li><a href="/">Hato Hone St John</a></li>
        </ul>
        <!--Hamburger Menu-->
        <ul>
            <li>
                <a id="hamburger" href="/">☰</a>
            </li>
        </ul>
    </nav>
    <nav id="dropdown-menu">
        <ul >
            <!-- Add items for the dropdown menu here -->
            <li><a href="/">Home</a></li>
            <li><a href="/">FENZ</a></li>
            <li><a href="/">Police</a></li>
            <li><a href="/">Hato Hone St John</a></li>
        </ul>
    </nav>
</header>

<style>
    header{
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
        background-color: lightskyblue;   
    }
    h1 {
        width: 25em;
        font-size: 20px;
        text-transform: uppercase;
        text-decoration: underline;
        letter-spacing: 4px;
        
        text-align: center;
    }
    ul li a {
    text-decoration: none;
    color:#333;
    }
    ul {
        display: flex;
        justify-content: center;
        list-style: none;
        font-size: 1.2em;
        /* Puts the title onto the same line */      
        /*Centers list elements directly*/
        padding: 1em; 
    }
    ul li{
        padding: 1em;
        border-radius: 10px;
        margin: 10px;
        background-color: rgb(39, 160, 230);
    }
    /*Hamburger menu list*/
    ul:last-of-type{
        display: none;
    }
    #dropdown-menu{
        display: none;
        background-color: rgb(46, 46, 46);
        width: 600px;
        /*Take the hamburger menu outside of the normal document flow*/
        position: absolute;
        top: 180px;    
    }
    #dropdown-menu ul{
        flex-direction: column;
        margin-left: 1em;
        /*Remove default padding*/
        padding: 0px;
    }
    #dropdown-menu ul li{
        background-color: inherit;
        
        /*Remove default padding*/
        padding: 1em;
    }
    #dropdown-menu ul li a{
        color: white;
    }

@media (width <= 820px){
    /*First list on nav menu*/
    ul:first-of-type{
        display: none;
    }
    /*Last list on nav menu for hamburger menu*/
    ul:last-of-type{
        display: flex;
    }
}

</style>