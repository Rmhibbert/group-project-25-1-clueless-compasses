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
        center: [170.51952093430864, -45.86587714349185], // longitude, latitude
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
  