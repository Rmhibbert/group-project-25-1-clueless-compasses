<script>
    import Navigation from "$lib/Navigation.svelte";
    import Footer from "$lib/Footer.svelte";
    import '../styles/global.css'
</script>

<Navigation/>

<slot /> <!--Page specific code-->

<Footer/>