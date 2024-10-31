<script>
    import MapView from "@arcgis/core/views/MapView";
    import "@arcgis/core/assets/esri/themes/light/main.css";
  
    const createMap = (domNode) => {
      const view = new MapView({
        container: domNode,
        map: {
          basemap: "streets-vector",
        },
        zoom: 15,
        center: [-90.1928, 38.6226], // longitude, latitude
      });
    };
  </script>
  

  <section>
    <div class="view" use:createMap></div>
  </section>

  <style>
    .view {
      height: 400px;
      width: 800px;
    }
  </style>
  