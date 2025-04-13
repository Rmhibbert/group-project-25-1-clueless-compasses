<script>
    export let fullAlertDetails;
    console.log(fullAlertDetails); // Check the prop value

    //Object of emojis for conversion from colour to emoji used by the getEmoji function
    const emojis = {
        Green: "🟩",
        Yellow: "🟨",
        Orange: "🟧",
        Red: "🟥",
    };

    function getEmoji(colorValue) {
        return emojis[colorValue] || "⚪";
    }

</script>

<section>
    <h1 class="text-2xl font-bold">(New) Metservice Warnings</h1>

    {#if fullAlertDetails && fullAlertDetails.length > 0}
        <ul class="space-y-4">
            {#each fullAlertDetails as alert}
                <li class="border p-4 rounded-lg shadow">
                    <h2 class="text-xl font-semibold">
                        {getEmoji(alert.parameter[1].value)}
                        {alert.title}
                    </h2>
                    <p class="text-sm">{alert.area.areaDesc}</p>
                    <p class="mt-2">{alert.description}</p>
                    <p class="text-sm text-gray-600">{alert.pubDate}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>Loading alerts or none available.</p>
    {/if}
</section>
