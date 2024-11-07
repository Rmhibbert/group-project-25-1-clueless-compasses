<script>
    import { onMount } from "svelte";

    let dropdownMenu;
    let dropdownDisplayed=false;

    function displayMenu() {
        // Toggle the display style of the dropdown menu
        dropdownDisplayed=true;
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    }

    //hides dropdown if anywhere on the page is clicked but the options or the hamburger icon
  function hideDropdown(event){
    if(dropdownDisplayed&&!dropdownMenu.contains(event.target)&&event.target.id!="hamburger"){
        dropdownMenu.style.display = 'none';
        dropdownDisplayed = false;
    }
  }
  onMount(()=>{
    document.addEventListener("click", hideDropdown);
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
                <button id="hamburger" on:click={displayMenu}>☰</button>
            </li>
        </ul>
    </nav>
    <nav id="dropdown-menu" bind:this={dropdownMenu}>
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
        position: sticky;
  top: 0;
  z-index: 1000;
        box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
        background: rgb(5,58,120);
        background: linear-gradient(90deg, rgba(5,58,120,1) 0%, rgba(29,115,168,1) 31%, rgba(0,212,255,1) 100%);
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
        padding: 0.5em;
        border-radius: 0.625em;
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
 
    #dropdown-menu ul li a:hover{
        background-color: white;
        color: #333;       
    }

    #dropdown-menu a{
        padding-right: 6em;
        padding-top: 1em;
        cursor: pointer;
    }
 #dropdown-menu li{
    padding: 0;
 }
    #hamburger{
        font-size: 40px;
        cursor: pointer;
    }
    ul:has(#hamburger) {
    /* Styles for the <ul> containing the #hamburger */
        margin-left: 2em;
    }

@media (width <= 1200px){
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