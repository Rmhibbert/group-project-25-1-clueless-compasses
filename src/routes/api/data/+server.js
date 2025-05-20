import { XMLParser } from "fast-xml-parser";

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
  const cameraRes = await fetch("https://trafficnz.info/service/traffic/rest/4/cameras/all");
  const cameraXml = await cameraRes.text();
  const cameraParser = new XMLParser();
  const cameraData = cameraParser.parse(cameraXml);

  const baseUrl = "https://trafficnz.info";
  const cameras = cameraData.response.camera.map((camera) => ({
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
    if (!acc[region]) acc[region] = [];
    acc[region].push(camera);
    return acc;
  }, {});

  const alertsRes = await fetch("https://alerts.metservice.com/cap/rss");
  const alertsXml = await alertsRes.text();
  const alertsParser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name) => name === "item",
  });
  const metserviceAlerts = alertsParser.parse(alertsXml);

  const fullAlertDetails = await Promise.all(
    (metserviceAlerts.rss.channel.item || []).map(async (alert) => {
      const alertRes = await fetch(alert.link);
      const alertXml = await alertRes.text();
      const alertParser = new XMLParser({ ignoreAttributes: false });
      const alertDetails = alertParser.parse(alertXml);
      return {
        ...alert,
        ...alertDetails.alert.info,
      };
    })
  );

  return new Response(JSON.stringify({ groupedCameras, fullAlertDetails }), {
    headers: { 'Content-Type': 'application/json' }
  });
}