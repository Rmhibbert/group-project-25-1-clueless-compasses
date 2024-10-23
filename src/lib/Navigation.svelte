<script>

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
        
    </nav>
</header>



<style>
    header{
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
    }
    nav {
        background-color: red;
    }
    ul {
        display: flex;
        justify-content: space-around;
        list-style: none;
        font-size: 1.2em;
        /* Puts the title onto the same line */     
        background-color: yellow;
    }
    ul li{
        padding: 1em;
        border-radius: 10px;
        margin-inline: 0.4em;
        background-color: greenyellow;
    }

h1 {
    width: 15em;
}

ul li a {
    text-decoration: none;
    color:#333;
}

@media (width <= 820px){
    header{
        background-color: red;    
        flex-direction: column;    
    }

}

</style>