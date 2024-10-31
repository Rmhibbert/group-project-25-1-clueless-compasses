<script>
  import { onMount } from 'svelte';
  let alerts = []; //Empty array

  onMount(async() => {
    const rssUrl = "https://cors-anywhere.herokuapp.com/https://alerts.metservice.com/cap/rss";
    const res = await fetch(rssUrl);
    const text = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "test/xml");
    const items = xmlDoc.getElementsByTagName("item");
    for (let item of items){
        const link = items.getElementsByTagName("item");
        const alertDetails = await fetchAlerts(link);
        alerts.push(alertDetails)
    }
  });
</script>