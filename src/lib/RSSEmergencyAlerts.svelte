<script>
    export let fullAlertDetails;
    console.log(fullAlertDetails); // Check the prop value

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

    {#if fullAlertDetails && fullAlertDetails.length > 0}
        <ul class="space-y-4">
            {#each fullAlertDetails as alert}
                <li class="border p-4 rounded-lg shadow">
                    <h2 class="text-xl font-semibold mb-1">
                        {getEmoji(alert.parameter[1].value)}
                        {alert.title}
                    </h2>
                    <p class="text-sm mb-1">📍 {alert.area.areaDesc}</p>
                    <p class="mb-2">{alert.description}</p>
                    <p class="text-sm">{formatIssuedDate(alert.pubDate)}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>Loading alerts or none available.</p>
    {/if}
</section>
