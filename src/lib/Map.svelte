<script>
    import MapView from "@arcgis/core/views/MapView";
    import Graphic from "@arcgis/core/Graphic";
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
    import Point from "@arcgis/core/geometry/Point";
    import "@arcgis/core/assets/esri/themes/light/main.css";
    import Home from "@arcgis/core/widgets/Home";
  
    const createMap = (domNode) => {
      const graphicsLayer = new GraphicsLayer();
  
      // Create the map view
      const view = new MapView({
        container: domNode,
        map: {
          basemap: "streets-vector",
          layers: [graphicsLayer],
        },
        zoom: 15,
        center: [170.51952093430864, -45.86587714349185],
      });
      
      const homeWidget = new Home({
         view: view
      });
    view.ui.add(homeWidget, "top-left"); // Add the Home button to the top-left of the view

      // List of points with labels
      const points = [
        { coords: [170.5195, -45.8659], label: "Otago Polytech" },
        { coords: [170.4958, -45.8804], label: "OtagoCDEM" },
        { coords: [170.5020, -45.8744], label: "Emergency Operations Centre" },
        { coords: [170.32762846702468, -45.94930979874042], label: "Brighton Hall" },
        { coords: [170.5020, -45.8744], label: "Broad Bay Community Centre" },
        { coords: [170.5020, -45.8744], label: "Emergency Operations Centre" },
        { coords: [170.5020, -45.8744], label: "Emergency Operations Centre" },

      ];
  
      points.forEach(({ coords, label }) => {
        const point = new Point({
          longitude: coords[0],
          latitude: coords[1],
        });
  
        // Define point symbol
        const pointSymbol = {
          type: "simple-marker",
          color: "red",
          size: "10px",
          outline: {
            color: "black",
            width: 1,
          },
        };
  
        // Define text symbol
        const textSymbol = {
          type: "text",
          color: "black",
          haloColor: "white",
          haloSize: "2px",
          text: label,
          font: {
            size: 10,
          },
          horizontalAlignment: "left",
          verticalAlignment: "center",
          xoffset: 10,
          yoffset: -1
        };
  
        // Create graphics for point and label
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: pointSymbol,
        });
  
        const textGraphic = new Graphic({
          geometry: point,
          symbol: textSymbol,
        });
  
        // Add both point and text graphics to the layer
        graphicsLayer.add(pointGraphic);
        graphicsLayer.add(textGraphic);
      });
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