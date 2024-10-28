<script>
    export let resources;

    let resourceItems = []; // Initialize an empty array

    // Use a for loop to create list items
    for (let i = 0; i < resources.length; i++) {
        resourceItems.push({
            title: resources[i].title,
            description: resources[i].description,
            link: resources[i].link
        });
    }
</script>

<section>
    <h1>Community Facilities Improvement</h1>
    <p>As a community board member, here are some resources to help improve facilities after a disaster.</p>
    <ul>
        {#each resourceItems as resource}
            <li>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener">Learn more</a>
            </li>
        {/each}
    </ul>
</section>

<style>
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 1.5rem; /* Uncomment if needed */
    }
</style>
