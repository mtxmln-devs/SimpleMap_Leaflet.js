/**
 * Main Application Entry Point
 */

const AtlasApp = {
    // Initialize the application
    init: function() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },

    // Start application
    start: function() {
        console.log('🗺️  Atlas Prime Initializing...');

        try {
            // Initialize Map
            MapController.init();
            
            // Add markers to map
            MapController.addMarkersToLayers();
            
            // Initialize UI
            UIController.init();
            
            // Hide loader after delay
            setTimeout(() => {
                UIController.hideLoader();
                console.log('✅ Atlas Prime Ready');
            }, 1500);

        } catch (error) {
            console.error('❌ Atlas Prime Initialization Error:', error);
        }
    }
};

// Start the app
AtlasApp.init();