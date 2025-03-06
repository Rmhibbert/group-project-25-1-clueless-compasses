<script>
    import Navigation from "$lib/Navigation.svelte";
    import Footer from "$lib/Footer.svelte";
    import "../app.css";
</script>

<Navigation/>
<main id="content">
<slot /> <!--Page specific code-->
</main>
<Footer/>