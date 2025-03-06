<script>
    import Navigation from "$lib/Navigation.svelte";
    import Footer from "$lib/Footer.svelte";
    import "../app.css";
    import { selectedAgency } from "$lib/stores.js";

    //  To display all widgets
    selectedAgency.set("All");

</script>

<Navigation />
<main id="content">
    <slot /> <!--Page specific code-->
</main>
<Footer />
