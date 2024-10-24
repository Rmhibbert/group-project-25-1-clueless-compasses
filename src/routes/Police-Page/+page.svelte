<script>
</script>

<body>
<div class="contactInfo">
        <img src="/images/policeLogo.jpg"alt="ff"/>
        <div class="contact-text-content">
            <h3>Contact information</h3>
            <p>Emergency number: 111</p>
            <p>Non-Emergency number: 105</p>
            <a href="https://www.police.govt.nz/contact-us/stations" >Find a specific local police station number here</a>
        </div>
</div>
   
    
</body>

<style>
    .contactInfo {
        display: grid;
        grid-template-columns: 1fr 1fr ;
        gap: 10px;
    }
    img {
        grid-column: 1;
        height: 250px;
        width: auto;
        box-shadow: 0.1em 0.1em 0.2em rgb(255, 0, 0);
    }
    .contact-text-content {
            grid-column: 2;
            gap: 20px;
            padding: 0.5em;
            border: 0.1em solid black;
            border-radius: 0.3em;
            box-shadow: 0.1em 0.1em 0.2em rgb(15, 0, 185);
        }
    

</style>
