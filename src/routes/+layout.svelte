<script>
    import Navigation from "$lib/Navigation.svelte";
    import Footer from "$lib/Footer.svelte";
    import '../styles/global.css'
</script>

<Navigation/>
<body>
    <main id="content">
        <slot /> <!--Page specific code-->
        </main>
</body>

<Footer/>
<style>

body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>