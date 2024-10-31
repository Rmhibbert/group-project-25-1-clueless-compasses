<script>
    import MapView from "@arcgis/core/views/MapView";
    import Graphic from "@arcgis/core/Graphic";
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
    import Point from "@arcgis/core/geometry/Point";
    import "@arcgis/core/assets/esri/themes/light/main.css";
  
  
    const createMap = (domNode) => {
      const graphicsLayer = new GraphicsLayer();
  
      // Create the map view
      const view = new MapView({
        container: domNode,
        map: {
          basemap: "streets-vector",
          layers: [graphicsLayer], // Add the graphicsLayer to the map
        },
        zoom: 15,
        center: [170.51952093430864, -45.86587714349185], // longitude, latitude
      });
  
      const point = new Point({
        longitude: 170.51952093430864,
        latitude: -45.86587714349185,
      });
  
      const pointSymbol = {
        type: "simple-marker", 
        color: "blue", 
        size: "15px",
        outline: {
          color: "black",
          width: 1,
        },
      };
  
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: pointSymbol,
      });
  
      // Add the graphic to the graphics layer
      graphicsLayer.add(pointGraphic);
    };
  </script>
  
  <section>
    <div class="view" use:createMap></div>
  </section>
  
  <style>
    .view {
      height: 350px;
      width: 350px;
    }
  </style>
  