//Imports API for the NZTA camera component
import { XMLParser } from "fast-xml-parser";

export async function load({ fetch }) {
    const res = await fetch(`https://trafficnz.info/service/traffic/rest/4/cameras/all`);
    const xmlText = await res.text();

    // Create a parser instance
    const parser = new XMLParser();
    const data = parser.parse(xmlText);

    // Required as data is returned as XML
    const cameras = data.response.camera.map((camera) => ({
        id: camera.id,
        description: camera.description,
        direction: camera.direction,
        highway: camera.highway,
        latitude: camera.latitude,
        longitude: camera.longitude,
        imageUrl: camera.imageUrl,
        thumbUrl: camera.thumbUrl,
        region: camera.region.name,
    }));

    return { cameras };
}
