<script>
    import { selectedAgency } from "$lib/stores.js";


    //All the data related to different agency's
    const allAgencyData = {
        "FENZ": {
            phone: "04 496 3600",
            email: "",
            website: "https://www.fireandemergency.nz/",
            description: "Fire and Emergency New Zealand."
        },
        "GeoNet": {
            phone: "",
            email: "info@geonet.org.nz",
            website: "https://www.geonet.org.nz/",
            description: "Earthquake and volcano monitoring."
        },
        "USAR": {
            phone: "",
            email: "info@nzsar.govt.nz",
            website: "https://nzsar.govt.nz/about-us-2/contact-us",
            description: "Urban Search and Rescue."
        }
    };
</script>

<section>
    <h1 class="text-2xl font-bold mb-4">Contact Us!</h1>
    

    <!-- Checking if they have the related data, if not it won't be displayed. -->
    {#if allAgencyData[$selectedAgency].email} 
    <h2 class="font-bold">Email:</h2> 
    <h3>{$selectedAgency ? allAgencyData[$selectedAgency].email : "ERROR"}</h3>
    {/if}
 

    {#if allAgencyData[$selectedAgency].phone} 
    <h2 class="font-bold mt-4">Phone Number:</h2> 
    <h3>{$selectedAgency ? allAgencyData[$selectedAgency].phone : "ERROR"}</h3>
    {/if}

    {#if allAgencyData[$selectedAgency].website} 
    <h2 class="font-bold mt-4 ">Website:</h2> 
    <h3>{$selectedAgency ? allAgencyData[$selectedAgency].website : "ERROR"}</h3>
    {/if}

    <h2 class="font-bold mt-4">Description:</h2> 
    <p>{$selectedAgency ? allAgencyData[$selectedAgency].description : "ERROR"}</p>
</section>
