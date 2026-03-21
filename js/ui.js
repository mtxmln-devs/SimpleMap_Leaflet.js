/**
 * UI Controller - Sidebar, Search, and Interface Management
 */

const UIController = {
    // Initialize UI components
    init: function() {
        this.populateLocationList();
        this.setupEventListeners();
        this.updateStats();
    },

    // Populate sidebar location list
    populateLocationList: function(locations = AtlasData.locations) {
        const container = document.getElementById('locationList');
        if (!container) return;

        if (locations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 text-sm py-4">No locations found</div>';
            return;
        }

        container.innerHTML = locations.map(loc => `
            <div onclick="MapController.focusLocation(${loc.id})" 
                 class="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 cursor-pointer transition-all">
                <div class="flex items-start justify-between mb-1">
                    <h4 class="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">${loc.name}</h4>
                    <span class="w-1.5 h-1.5 rounded-full ${AtlasData.getStatusDotClass(loc.status)}"></span>
                </div>
                <p class="text-xs text-gray-500 line-clamp-1">${loc.description}</p>
                <div class="mt-2 flex items-center gap-2 text-xs text-gray-600">
                    <span class="font-mono">${loc.lat.toFixed(2)}, ${loc.lng.toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    },

    // Setup UI event listeners
    setupEventListeners: function() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter checkboxes
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const layerType = e.target.getAttribute('data-layer');
                MapController.toggleLayer(layerType);
            });
        });

        // Reset view button
        const resetBtn = document.getElementById('resetViewBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                MapController.resetView();
            });
        }

        // Mobile sidebar toggle
        const toggleBtn = document.getElementById('toggleSidebar');
        const sidebar = document.getElementById('sidebar');
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('closed');
            });
        }
    },

    // Handle search input
    handleSearch: function(query) {
        const lowerQuery = query.toLowerCase();
        const filtered = AtlasData.locations.filter(loc => 
            loc.name.toLowerCase().includes(lowerQuery) || 
            loc.description.toLowerCase().includes(lowerQuery)
        );
        this.populateLocationList(filtered);
    },

    // Update statistics
    updateStats: function() {
        const activeNodesElement = document.getElementById('activeNodes');
        if (activeNodesElement) {
            activeNodesElement.textContent = AtlasData.locations.length;
        }
    },

    // Hide loader
    hideLoader: function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }
};