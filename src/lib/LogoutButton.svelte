<script>

var blackList;

function Logout()
{
    blackList += "Token Here";
    console.log("button hit");
}




</script>

<button class=""
    on:click={Logout}>
        Logout
</button>

<style>
        button{
        padding: 0.6em 1em 0.6em 1em;
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
        width: 8em;
    }
    :global(body.dark) button{
        background-color: white;
        color: #333;
    } 
</style>