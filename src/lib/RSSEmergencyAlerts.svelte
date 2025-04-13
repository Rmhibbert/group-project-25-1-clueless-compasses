<script lang="ts">
    export let metserviceAlerts;
    const alerts = metserviceAlerts.rss.channel.item ?? [];
</script>

<section>
    <h1 class="text-2xl font-bold">(New) Metservice Warnings</h1>

    {#if alerts.length > 0}
        <ul class="space-y-4">
            {#each alerts as alert}
                <li class="border p-4 rounded-lg shadow">
                    <h2 class="text-xl font-semibold">{alert.title}</h2>
                    <p class="text-sm text-gray-600">{alert.pubDate}</p>
                    <p class="mt-2">{alert.description}</p>
                    <a
                        class="text-blue-500 underline mt-2 inline-block"
                        href={alert.link}
                        target="_blank"
                    >
                        View Full Alert
                    </a>
                </li>
            {/each}
        </ul>
        <!-- If there are no current alerts displays a message -->
    {:else}
        <p>Loading alerts or none available.</p>
    {/if}
</section>
