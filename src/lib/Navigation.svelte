<script>
    let dropdownMenu;
    function displayMenu() {
        // Toggle the display style of the dropdown menu
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    }
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
            <li>
                Button
            </li>
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
            <li>Button</li>
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
        padding: 0.3em 0.8em 0.3em 0.8em;
        border-radius: 0.625em;
        margin: 10px;  
        align-self: center;
    }
    /*ul list that contains the #hamburger a tag ☰*/
    ul:last-of-type{
        display: none;
    }
    #dropdown-menu{
        display: none;
        background-color: #333;
        width: 20em;
        position: absolute;
        top: 10em;
        border-radius: 1em;
    }
    #dropdown-menu ul{
        flex-direction: column;
    }
    #dropdown-menu ul li{
        align-self: last baseline;
        list-style: square;
        color: white;
        margin-left: 2em;
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
    button{
        padding: 0;
        border: none;
        background-color: transparent;
        font-family: inherit;
        font-weight: bolder;
        font-size: inherit;
        color: white;
    }
    button{
        cursor: pointer;
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
        border: 5px solid black;
        box-shadow: 3px 3px 10px black;
    }
}

</style>