<script>
  export let fullAlertDetails;
  console.log(fullAlertDetails);

  $: hasAlerts = fullAlertDetails && fullAlertDetails.length > 0;

  // Object of emojis for conversion from colour to emoji used by the getEmoji function
  const emojis = {
    Green: "🟩",
    Yellow: "🟨",
    Orange: "🟧",
    Red: "🟥",
  };

  function getEmoji(colorValue) {
    return emojis[colorValue] || "⚪";
  }

  //Finds a specific parameter value, needed as the color isn't always the same index
  function getParameterValue(params, name) {
    return params.find((p) => p.valueName === name)?.value;
  }

  // Formats date to nicer format
  function formatIssuedDate(dateString) {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-NZ", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-NZ", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `📅 Issued: ${datePart} at ${timePart}`;
  }
</script>

<section>
  <h1 class="text-2xl font-bold mb-4">Metservice Warnings</h1>
  <!-- If there is an alert display other wise show no alerts message -->
  {#if hasAlerts}
    <ul class="space-y-4">
      {#each fullAlertDetails as alert}
        <li class="border p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-1">
            {getEmoji(getParameterValue(alert.parameter, "ColourCode"))}
            {alert.title}
          </h2>
          <p class="text-sm mb-1">📍 {alert.area.areaDesc}</p>
          <p class="mb-2">{alert.description}</p>
          <p class="text-sm">{formatIssuedDate(alert.pubDate)}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No alerts available.</p>
  {/if}
</section>
