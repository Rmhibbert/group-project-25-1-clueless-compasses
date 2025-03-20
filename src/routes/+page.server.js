//Imports API for the NZTA camera component
import { XMLParser } from "fast-xml-parser";

export async function load({ fetch }) {
    const res = await fetch(`https://trafficnz.info/service/traffic/rest/4/cameras/all`);
    const xmlText = await res.text();

    // Create a parser instance
    const parser = new XMLParser();
    const data = parser.parse(xmlText);

    const baseUrl = "https://trafficnz.info";

  // Required as data is returned as XML
const cameras = data.response.camera.map((camera) => ({
    id: camera.id,
    name: camera.name,
    description: camera.description,
    direction: camera.direction,
    highway: camera.highway,
    latitude: camera.latitude,
    longitude: camera.longitude,
    imageUrl: baseUrl + camera.imageUrl,
    thumbUrl: baseUrl + camera.thumbUrl,
    regionid: camera.region.id,
    region: camera.region.name,
}));

const groupedCameras = cameras.reduce((acc, camera) => {
    const region = camera.region;
    if (!acc[region]) {
        acc[region] = [];
    }
    acc[region].push(camera);
    return acc;
}, {});

return { groupedCameras }};
