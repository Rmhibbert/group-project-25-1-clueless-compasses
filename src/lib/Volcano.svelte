<script>
    import { onMount } from "svelte";

    let volcanos = [];

    onMount(async () => {
        const res = await fetch(`https://api.geonet.org.nz/volcano/val`);
        let data = await res.json();
        volcanos = data.features;
    });

    //Object of emojis for conversion from colour to emoji used by the getEmoji function
    const emojis = {
        Green: "🟩",
        Yellow: "🟨",
        Orange: "🟧",
        Red: "🟥",
    };

    // Sets a background and text color for the ACC displayed from API
    function getACCStyles(acc) {
        switch (acc) {
            case "Green":
                return "text-white bg-green-500";
            case "Yellow":
                return "text-black bg-yellow-400";
            case "Orange":
                return "text-white bg-orange-600";
            case "Red":
                return "text-white bg-red-600";
            default:
                return "text-white bg-gray-800";
        }
    }

    //Using the emojis object to grab the emoji corresponding to the colour
    function getEmoji(acc) {
        return emojis[acc] || "⚪"; // Default emoji for unknown acc
    }
</script>

<section>
    <h1 class="text-2xl font-bold">Volcano Information</h1>
    <h3 class="text-lg">Volcano status by city:</h3>
    {#each volcanos as volcano}
        <details class="my-2 border rounded-md p-2">
            <summary class="cursor-pointer font-semibold">
                {getEmoji(volcano.properties.acc)}
                {volcano.properties.volcanoTitle}
            </summary>
            <p><strong>Activity:</strong> {volcano.properties.activity}</p>
            <p><strong>Level:</strong> {volcano.properties.level}</p>
            <p><strong>Hazards:</strong> {volcano.properties.hazards}</p>
            <p
                class="w-24 text-center rounded-md px-2 py-1 mt-2 {getACCStyles(
                    volcano.properties.acc,
                )}"
            >
                <strong>ACC:</strong>
                {volcano.properties.acc}
            </p>
        </details>
    {/each}
</section>
