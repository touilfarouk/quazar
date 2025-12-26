// AboutPage Component
const AboutPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md" style="max-width: 1200px; margin: 0 auto;">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">About Glen Forest PTO</h1>
          <p class="text-h6 text-grey-8">Discover our mission and community reach</p>
        </div>

        <!-- About Content -->
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12 col-md-6">
            <q-card flat bordered style="border-radius: 12px;">
              <q-card-section>
                <div class="text-h5 text-weight-medium q-mb-md">Our Mission</div>
                <p class="text-body1 text-grey-8" style="line-height: 1.8;">
                  Glen Forest PTO is dedicated to supporting our school community through 
                  fundraising initiatives and community engagement. Our handmade crocheted 
                  products bring warmth and comfort while raising funds for educational programs.
                </p>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered style="border-radius: 12px;">
              <q-card-section>
                <div class="text-h5 text-weight-medium q-mb-md">What We Do</div>
                <p class="text-body1 text-grey-8" style="line-height: 1.8;">
                  We create beautiful, handmade crocheted hats and accessories available 
                  from December to January. Every purchase supports Glen Forest students 
                  and helps fund important school programs and activities.
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Map Section -->
        <div class="q-mb-md">
          <div class="text-h4 text-weight-bold text-center q-mb-md">Our Community Reach</div>
          <p class="text-body1 text-center text-grey-7 q-mb-lg">
            Glen Forest PTO locations across the United States
          </p>
        </div>

        <q-card flat bordered style="border-radius: 12px; overflow: hidden;">
          <div id="map" style="height: 600px; width: 100%;"></div>
        </q-card>

        <!-- Stats Section -->
        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div class="text-h3 text-weight-bold text-white">50+</div>
              <div class="text-subtitle1 text-white">Locations</div>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              <div class="text-h3 text-weight-bold text-white">1000+</div>
              <div class="text-subtitle1 text-white">Products Sold</div>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
              <div class="text-h3 text-weight-bold text-white">$50K+</div>
              <div class="text-subtitle1 text-white">Funds Raised</div>
            </q-card>
          </div>
        </div>

        <div class="text-center q-mt-xl">
          <q-btn color="primary" label="Back to Home" to="/" size="lg" class="q-px-xl" />
        </div>
      </div>
    </q-page>
  `,
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Load Leaflet JS if not already loaded
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
        script.crossOrigin = '';
        script.onload = () => this.createMap();
        document.head.appendChild(script);
      } else {
        this.createMap();
      }
    },
    createMap() {
      // Initialize map centered on USA
      const map = L.map('map').setView([39.8283, -98.5795], 4);

      // Add Stamen Terrain tile layer (use .jpg extension and fallback to OpenStreetMap on error)
      var Stamen_Terrain = L.tileLayer(
        'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 18
        }
      );

      // Add it to the map and handle tile errors by falling back to OSM
      Stamen_Terrain.addTo(map);

      // Additional base layers
      var googleTerrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        attribution: 'Map data &copy; Google',
        maxZoom: 19
      });

      var googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: 'Imagery &copy; Google',
        maxZoom: 19
      });

      var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19
      });

      var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.cyclosm.org/">CyclOSM</a> contributors',
        maxZoom: 19
      });

      var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors',
        maxZoom: 17
      });

      var baseLayers = {
        // 'Route de Google Street map': OpenStreetMap,
        // 'Une vue de Stamen': Stamen_Terrain,
        // 'Une vue de CyclOSM': CyclOSM,
        // 'Une vue topographique': OpenTopoMap,

        "Vue de terrain": googleTerrain,
        "Avec des routes": OpenStreetMap,
        "Vue satellite": googleSat,
        'Stamen Terrain': Stamen_Terrain,
        'CyclOSM': CyclOSM,
        'OpenTopoMap': OpenTopoMap
      };

      // Add layer control to toggle basemaps
      L.control.layers(baseLayers, null, { position: 'topright', collapsed: false }).addTo(map);

      // If Stamen tiles fail, replace with OpenStreetMap tiles
      Stamen_Terrain.on('tileerror', function() {
        map.eachLayer(function(layer) {
          // remove only tile layers (avoid removing markers/controls)
          if (layer instanceof L.TileLayer) map.removeLayer(layer);
        });
        OpenStreetMap.addTo(map);
      });

      // Ensure the map renders correctly inside the card
      setTimeout(function() { map.invalidateSize(); }, 200);
      // Glen Forest PTO locations across USA
      const locations = [
        // Northeast
        { name: 'Glen Forest PTO - New York', lat: 40.7128, lng: -74.0060, state: 'NY' },
        { name: 'Glen Forest PTO - Boston', lat: 42.3601, lng: -71.0589, state: 'MA' },
        { name: 'Glen Forest PTO - Philadelphia', lat: 39.9526, lng: -75.1652, state: 'PA' },
        { name: 'Glen Forest PTO - Portland', lat: 43.6591, lng: -70.2568, state: 'ME' },
        { name: 'Glen Forest PTO - Burlington', lat: 44.4759, lng: -73.2121, state: 'VT' },
        
        // Southeast
        { name: 'Glen Forest PTO - Atlanta', lat: 33.7490, lng: -84.3880, state: 'GA' },
        { name: 'Glen Forest PTO - Miami', lat: 25.7617, lng: -80.1918, state: 'FL' },
        { name: 'Glen Forest PTO - Charlotte', lat: 35.2271, lng: -80.8431, state: 'NC' },
        { name: 'Glen Forest PTO - Nashville', lat: 36.1627, lng: -86.7816, state: 'TN' },
        { name: 'Glen Forest PTO - Richmond', lat: 37.5407, lng: -77.4360, state: 'VA' },
        
        // Midwest
        { name: 'Glen Forest PTO - Chicago', lat: 41.8781, lng: -87.6298, state: 'IL' },
        { name: 'Glen Forest PTO - Detroit', lat: 42.3314, lng: -83.0458, state: 'MI' },
        { name: 'Glen Forest PTO - Minneapolis', lat: 44.9778, lng: -93.2650, state: 'MN' },
        { name: 'Glen Forest PTO - Milwaukee', lat: 43.0389, lng: -87.9065, state: 'WI' },
        { name: 'Glen Forest PTO - Indianapolis', lat: 39.7684, lng: -86.1581, state: 'IN' },
        { name: 'Glen Forest PTO - Columbus', lat: 39.9612, lng: -82.9988, state: 'OH' },
        { name: 'Glen Forest PTO - Kansas City', lat: 39.0997, lng: -94.5786, state: 'MO' },
        { name: 'Glen Forest PTO - St. Louis', lat: 38.6270, lng: -90.1994, state: 'MO' },
        
        // Southwest
        { name: 'Glen Forest PTO - Dallas', lat: 32.7767, lng: -96.7970, state: 'TX' },
        { name: 'Glen Forest PTO - Houston', lat: 29.7604, lng: -95.3698, state: 'TX' },
        { name: 'Glen Forest PTO - Austin', lat: 30.2672, lng: -97.7431, state: 'TX' },
        { name: 'Glen Forest PTO - Phoenix', lat: 33.4484, lng: -112.0740, state: 'AZ' },
        { name: 'Glen Forest PTO - Albuquerque', lat: 35.0844, lng: -106.6504, state: 'NM' },
        { name: 'Glen Forest PTO - Oklahoma City', lat: 35.4676, lng: -97.5164, state: 'OK' },
        
        // West
        { name: 'Glen Forest PTO - Los Angeles', lat: 34.0522, lng: -118.2437, state: 'CA' },
        { name: 'Glen Forest PTO - San Francisco', lat: 37.7749, lng: -122.4194, state: 'CA' },
        { name: 'Glen Forest PTO - San Diego', lat: 32.7157, lng: -117.1611, state: 'CA' },
        { name: 'Glen Forest PTO - Seattle', lat: 47.6062, lng: -122.3321, state: 'WA' },
        { name: 'Glen Forest PTO - Portland', lat: 45.5152, lng: -122.6784, state: 'OR' },
        { name: 'Glen Forest PTO - Denver', lat: 39.7392, lng: -104.9903, state: 'CO' },
        { name: 'Glen Forest PTO - Las Vegas', lat: 36.1699, lng: -115.1398, state: 'NV' },
        { name: 'Glen Forest PTO - Salt Lake City', lat: 40.7608, lng: -111.8910, state: 'UT' },
        
        // Mountain States
        { name: 'Glen Forest PTO - Boise', lat: 43.6150, lng: -116.2023, state: 'ID' },
        { name: 'Glen Forest PTO - Billings', lat: 45.7833, lng: -108.5007, state: 'MT' },
        { name: 'Glen Forest PTO - Cheyenne', lat: 41.1400, lng: -104.8202, state: 'WY' },
        
        // Plains
        { name: 'Glen Forest PTO - Omaha', lat: 41.2565, lng: -95.9345, state: 'NE' },
        { name: 'Glen Forest PTO - Des Moines', lat: 41.5868, lng: -93.6250, state: 'IA' },
        { name: 'Glen Forest PTO - Sioux Falls', lat: 43.5460, lng: -96.7313, state: 'SD' },
        { name: 'Glen Forest PTO - Fargo', lat: 46.8772, lng: -96.7898, state: 'ND' },
        
        // South
        { name: 'Glen Forest PTO - New Orleans', lat: 29.9511, lng: -90.0715, state: 'LA' },
        { name: 'Glen Forest PTO - Birmingham', lat: 33.5186, lng: -86.8104, state: 'AL' },
        { name: 'Glen Forest PTO - Jackson', lat: 32.2988, lng: -90.1848, state: 'MS' },
        { name: 'Glen Forest PTO - Little Rock', lat: 34.7465, lng: -92.2896, state: 'AR' },
        { name: 'Glen Forest PTO - Louisville', lat: 38.2527, lng: -85.7585, state: 'KY' },
        
        // Mid-Atlantic
        { name: 'Glen Forest PTO - Baltimore', lat: 39.2904, lng: -76.6122, state: 'MD' },
        { name: 'Glen Forest PTO - Washington DC', lat: 38.9072, lng: -77.0369, state: 'DC' },
        { name: 'Glen Forest PTO - Pittsburgh', lat: 40.4406, lng: -79.9959, state: 'PA' },
        
        // Additional locations
        { name: 'Glen Forest PTO - Anchorage', lat: 61.2181, lng: -149.9003, state: 'AK' },
        { name: 'Glen Forest PTO - Honolulu', lat: 21.3099, lng: -157.8581, state: 'HI' },
        { name: 'Glen Forest PTO - San Antonio', lat: 29.4241, lng: -98.4936, state: 'TX' },
        { name: 'Glen Forest PTO - Memphis', lat: 35.1495, lng: -90.0490, state: 'TN' },
        { name: 'Glen Forest PTO - Raleigh', lat: 35.7796, lng: -78.6382, state: 'NC' }
      ];

      // Custom icon for Glen Forest PTO
      const glenForestIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #1976d2; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-weight: bold; font-size: 14px;">GF</span></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });

      // Add markers for each location
      locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], { icon: glenForestIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="text-align: center; padding: 10px;">
            <strong style="font-size: 16px; color: #1976d2;">${location.name}</strong><br>
            <span style="color: #666; font-size: 14px;">${location.state}</span><br>
            <div style="margin-top: 8px;">
              <span style="background: #4caf50; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Active</span>
            </div>
          </div>
        `);
      });

      // Add legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
          <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
            <div style="font-weight: bold; margin-bottom: 8px; color: #1976d2;">Glen Forest PTO</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="background-color: #1976d2; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>
              <span style="font-size: 13px;">PTO Location</span>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              ${locations.length} locations nationwide
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(map);
    }
  }
};

export default AboutPage;