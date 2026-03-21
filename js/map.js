/**
 * Map Controller - Leaflet Map Initialization and Control
 */

const MapController = {
    map: null,
    layers: {},

    // Initialize the map
    init: function() {
        // Create map instance
        this.map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
            minZoom: 2,
            maxZoom: 18,
            worldCopyJump: true
        }).setView(
            [AtlasData.config.defaultView.lat, AtlasData.config.defaultView.lng],
            AtlasData.config.defaultView.zoom
        );

        // Add tile layer
        L.tileLayer(AtlasData.config.tileLayer.url, {
            attribution: AtlasData.config.tileLayer.attribution,
            subdomains: AtlasData.config.tileLayer.subdomains,
            maxZoom: AtlasData.config.tileLayer.maxZoom
        }).addTo(this.map);

        // Add zoom control
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);

        // Add scale control
        L.control.scale({
            position: 'bottomright',
            imperial: false,
            metric: true
        }).addTo(this.map);

        // Initialize layer groups
        this.initLayers();

        // Setup event listeners
        this.setupEventListeners();

        return this.map;
    },

    // Initialize layer groups
    initLayers: function() {
        this.layers = {
            hubs: L.layerGroup(),
            satellites: L.layerGroup(),
            zones: L.layerGroup()
        };

        // Add all layer groups to map
        Object.values(this.layers).forEach(layer => {
            layer.addTo(this.map);
        });
    },

    // Add markers to their respective layers
    addMarkersToLayers: function() {
        AtlasData.locations.forEach(location => {
            const marker = MarkerManager.createMarker(location);
            marker.addTo(this.layers[location.type]);
        });
    },

    // Setup map event listeners
    setupEventListeners: function() {
        // Update coordinates display
        this.map.on('mousemove', function(e) {
            const coordsElement = document.getElementById('coords');
            if (coordsElement) {
                coordsElement.textContent = 
                    `Lat: ${e.latlng.lat.toFixed(4)} | Lng: ${e.latlng.lng.toFixed(4)}`;
            }
        });
    },

    // Toggle layer visibility
    toggleLayer: function(type) {
        if (this.map.hasLayer(this.layers[type])) {
            this.map.removeLayer(this.layers[type]);
            return false;
        } else {
            this.map.addLayer(this.layers[type]);
            return true;
        }
    },

    // Focus on specific location
    focusLocation: function(id) {
        const location = AtlasData.getLocationById(id);
        if (!location) return;

        // Fly to location
        this.map.flyTo([location.lat, location.lng], 12, {
            duration: 1.5,
            easeLinearity: 0.25
        });

        // Open popup after animation
        setTimeout(() => {
            this.layers[location.type].eachLayer(marker => {
                const markerLatLng = marker.getLatLng();
                if (Math.abs(markerLatLng.lat - location.lat) < 0.001 && 
                    Math.abs(markerLatLng.lng - location.lng) < 0.001) {
                    marker.openPopup();
                }
            });
        }, 1500);
    },

    // Reset view to default
    resetView: function() {
        this.map.flyTo(
            [AtlasData.config.defaultView.lat, AtlasData.config.defaultView.lng],
            AtlasData.config.defaultView.zoom,
            { duration: 1.5 }
        );
    },

    // Get current map instance
    getMap: function() {
        return this.map;
    }
};