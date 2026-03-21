/**
 * Data Layer - Location Data and Configuration
 */

const AtlasData = {
    // Premium Location Data
    locations: [
        {
            id: 1,
            name: "Neo Tokyo Hub",
            lat: 35.6762,
            lng: 139.6503,
            type: "hubs",
            status: "active",
            description: "Primary Asia-Pacific operations center",
            metrics: { latency: "12ms", load: "87%" },
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Silicon Valley Core",
            lat: 37.4419,
            lng: -122.1430,
            type: "hubs",
            status: "active",
            description: "Global headquarters and R&D facility",
            metrics: { latency: "8ms", load: "92%" },
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "London Bridge Node",
            lat: 51.5074,
            lng: -0.1278,
            type: "hubs",
            status: "maintenance",
            description: "European data routing center",
            metrics: { latency: "18ms", load: "64%" },
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            name: "Singapore Uplink",
            lat: 1.3521,
            lng: 103.8198,
            type: "satellites",
            status: "active",
            description: "Satellite communications array",
            metrics: { latency: "22ms", load: "78%" },
            image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            name: "Dubai Oasis",
            lat: 25.2048,
            lng: 55.2708,
            type: "satellites",
            status: "active",
            description: "Middle East distribution node",
            metrics: { latency: "28ms", load: "71%" },
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop"
        },
        {
            id: 6,
            name: "Sydney Harbor",
            lat: -33.8688,
            lng: 151.2093,
            type: "hubs",
            status: "active",
            description: "Oceania primary gateway",
            metrics: { latency: "35ms", load: "83%" },
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop"
        },
        {
            id: 7,
            name: "Nordic Vault",
            lat: 59.9139,
            lng: 10.7522,
            type: "zones",
            status: "secure",
            description: "Arctic data preservation facility",
            metrics: { temp: "-2°C", security: "MAX" },
            image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop"
        },
        {
            id: 8,
            name: "Cairo Nexus",
            lat: 30.0444,
            lng: 31.2357,
            type: "zones",
            status: "active",
            description: "African continent bridge",
            metrics: { latency: "45ms", load: "69%" },
            image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&h=300&fit=crop"
        }
    ],

    // Configuration
    config: {
        defaultView: {
            lat: 20,
            lng: 0,
            zoom: 2
        },
        tileLayer: {
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        },
        colors: {
            hubs: '#6366f1',
            satellites: '#8b5cf6',
            zones: '#06b6d4'
        }
    },

    // Helper Methods
    getLocationById: function(id) {
        return this.locations.find(loc => loc.id === id);
    },

    getLocationsByType: function(type) {
        return this.locations.filter(loc => loc.type === type);
    },

    getStatusColor: function(status) {
        const colors = {
            active: 'text-green-400',
            maintenance: 'text-yellow-400',
            secure: 'text-blue-400',
            offline: 'text-red-400'
        };
        return colors[status] || 'text-gray-400';
    },

    getStatusDotClass: function(status) {
        const classes = {
            active: 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]',
            maintenance: 'bg-yellow-500',
            secure: 'bg-blue-500',
            offline: 'bg-red-500'
        };
        return classes[status] || 'bg-gray-500';
    }
};