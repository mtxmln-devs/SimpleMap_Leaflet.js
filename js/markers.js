/**
 * Marker Layer - Custom Marker Creation and Management
 */

const MarkerManager = {
    // Store marker references by type
    markers: {
        hubs: [],
        satellites: [],
        zones: []
    },

    // Create custom icon based on type
    createIcon: function(type) {
        const colors = {
            hubs: '#6366f1',
            satellites: '#8b5cf6',
            zones: '#06b6d4'
        };
        
        const color = colors[type] || '#6366f1';
        
        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div style="position: relative;">
                    <div class="marker-pulse" style="background: ${color}66;"></div>
                    <div class="custom-marker" style="background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);"></div>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    },

    // Create popup content for a location
    createPopupContent: function(location) {
        const statusColor = AtlasData.getStatusColor(location.status);
        
        return `
            <div class="relative overflow-hidden">
                <div class="h-24 bg-cover bg-center relative" style="background-image: url('${location.image}')">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <div class="absolute bottom-2 left-3 right-3">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${statusColor} bg-opacity-20 border border-current">
                            ${location.status.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-display font-bold text-lg mb-1">${location.name}</h3>
                    <p class="text-xs text-gray-400 mb-3">${location.description}</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        ${Object.entries(location.metrics).map(([key, value]) => `
                            <div class="bg-white/5 rounded-lg p-2 border border-white/5">
                                <span class="text-gray-500 block capitalize">${key}</span>
                                <span class="font-mono text-white">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="MapController.focusLocation(${location.id})" class="mt-3 w-full py-2 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-xs font-medium transition-colors">
                        Center View
                    </button>
                </div>
            </div>
        `;
    },

    // Create a single marker
    createMarker: function(location) {
        const marker = L.marker([location.lat, location.lng], {
            icon: this.createIcon(location.type)
        });

        // Bind popup
        marker.bindPopup(this.createPopupContent(location), {
            maxWidth: 300,
            className: 'custom-popup',
            closeButton: true
        });

        // Bind tooltip
        marker.bindTooltip(location.name, {
            direction: 'top',
            offset: [0, -10],
            className: 'map-tooltip'
        });

        // Add click interactions
        marker.on('click', function() {
            this.setZIndexOffset(1000);
        });

        marker.on('popupclose', function() {
            this.setZIndexOffset(0);
        });

        // Store reference
        if (!this.markers[location.type]) {
            this.markers[location.type] = [];
        }
        this.markers[location.type].push(marker);

        return marker;
    },

    // Create all markers from data
    createAllMarkers: function() {
        AtlasData.locations.forEach(location => {
            this.createMarker(location);
        });
    },

    // Get markers by type
    getMarkersByType: function(type) {
        return this.markers[type] || [];
    },

    // Clear all markers
    clearAll: function() {
        Object.keys(this.markers).forEach(type => {
            this.markers[type] = [];
        });
    }
};