export async function load() {
    const resources = [
        {
            title: "Facility Assessment Post-Disaster",
            description: "Guidelines to assess the condition of community facilities after a disaster.",
            link: "https://www.building.govt.nz/managing-buildings/managing-buildings-in-an-emergency/rapid-building-assessment-system/rapid-building-assessment-resources"
        },
        {
            title: "Rebuilding Strategies",
            description: "Steps to rebuild or reinforce community facilities to be disaster-resilient.",
            link: "https://www.civildefence.govt.nz/cdem-sector/plans-and-strategies/national-disaster-resilience-strategy"
        },
        {
            title: "Funding Resources",
            description: "Information on government and NGO funding available for facility improvements.",
            link: "https://www.civildefence.govt.nz/cdem-sector/guidelines/claims-factsheets"
        }
    ];

    return { resources };
}
