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
        const link = item.getElementsByTagName("item");
        const alertDetails = await fetchAlerts(link);
        alerts.push(alertDetails)
    }
  });
  async function fetchAlerts(link){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);
    const text = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text , "text/xml");
    const info = xmlDoc.getElementsByTagName("info")[0];
    const area = info.getElementsByTagName("area")[0];
    return{
        headline: info.getElementsByTagName("headline")[0]?.textContent,
        description: info.getElementsByTagName("description")[0]?.textContent,
        status: xmlDoc.getElementsByTagName("status")[0]?.textContent,
        senderName: info.getElementsByTagName("senderName")[0]?.textContent,
        urgency: info.getElementsByTagName("urgency")[0]?.textContent,
        severity: info.getElementsByTagName("severity")[0]?.textContent,
        time: xmlDoc.getElementsByTagName("sent")[0]?.textContent,
        areaDesc: area.getElementsByTagName("areaDesc")[0]?.textContent
    }
  }
</script>
