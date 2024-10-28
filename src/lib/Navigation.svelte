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
            <li><a href="/Police-Page">Police</a></li>
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
            <li><a href="/Police-Page">Police</a></li>
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
        background-color: rgb(29, 115, 168);   
    }
    h1 {
        width: 25em;
        font-size: 20px;
        text-transform: uppercase;
        text-decoration: underline;
        letter-spacing: 4px;    
        text-align: center;
        background-color: white;
        padding: 0.6em;
        box-shadow: 3px 3px 3px;
        margin-left: 1em;
    }
    ul li a {
        text-decoration: none;
        color:white;
        font-weight: 600;
    }
    ul li:hover a{    
        color: #333;  
    }
    ul li:hover {
        background-color: white; /* Example style for the <li> on hover */
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
        
    }
    /*ul list that contains the #hamburger a tag ☰*/
    ul:last-of-type{
        display: none;
    }
    #dropdown-menu{
        display: none;
        background-color: rgb(46, 46, 46);
        /*Take the hamburger menu outside of the normal document flow*/
        position: absolute;
        top: 200px;
        width: 380px;  
    }
    #dropdown-menu ul{
        flex-direction: column;
        /*Remove default padding*/
        padding: 0px;
    }
    #dropdown-menu ul li{   
        /*Remove default padding*/
        padding: 1em;
        margin-left: 2.4em;
        list-style:square;
        color: white;
    }
    #dropdown-menu ul li a{
        color: white;
    }
    #dropdown-menu ul li a:hover{
        background-color: white;
        color: #333;       
    }



    #hamburger{
        font-size: 40px;
    }
    ul:has(#hamburger) {
    /* Styles for the <ul> containing the #hamburger */
        margin-left: 2em;
    }

@media (width <= 1050px){
    /*First list on nav menu*/
    ul:first-of-type{
        display: none;
    }
    /*Last list on nav menu for hamburger menu*/
    ul:last-of-type{
        display: flex;
    }
    #dropdown-menu{
        border-radius: 1em;  
        border: 3px solid black;
        box-shadow: 10px 10px 10px;
    }
}

</style>