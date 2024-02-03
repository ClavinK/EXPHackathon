var map = L.map('map').setView([34.058141235688744, -117.8214710327107], 17);

map.locate({
    setView: true,
    maxZoom: 17
});

var hamburger = document.querySelector('.hamburger');

// Select the navigation links
var navLinks = document.querySelector('.nav-links');

// Add an event listener to the hamburger icon
hamburger.addEventListener('click', function () {
    // Toggle the display of the navigation links
    navLinks.classList.toggle('show');
});

var originalCoords = [34.058141235688744, -117.8214710327107];

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

document.getElementById('recenterButton').addEventListener('click', function () {
    map.setView(originalCoords, 17);
});

var marker1 = L.marker([34.05835127696246, -117.82505984474531]).addTo(map).bindPopup("Quad between Building 8 and 3");
var marker2 = L.marker([34.061406364858684, -117.81996569939186]).addTo(map).bindPopup("Business Adminstration Quad");
var marker3 = L.marker([34.059855725677906, -117.81981602899499]).addTo(map).bindPopup("CLA Building");
var marker4 = L.marker([34.05787329814037, -117.8214756528834]).addTo(map).bindPopup("Library");
var marker5 = L.marker([34.05618748038216, -117.82124127468484]).addTo(map).bindPopup("Bronco Student Center");
var marker6 = L.marker([34.05783870975634, -117.82329998574063]).addTo(map).bindPopup("Marketplace Exterior");
var marker7 = L.marker([34.05910848142184, -117.82234070061479]).addTo(map).bindPopup("Engineering Building Study Room");
var marker8 = L.marker([34.057605442527965, -117.82537251726828]).addTo(map).bindPopup("Building 4 Quad");


L.Control.RecenterButton = L.Control.extend({
    options: {
        position: 'bottomright' // Position of the control
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.id = 'recenterButton'; // Assign the ID to the container
        container.style.width = '40px';
        container.style.height = '40px';
        container.style.backgroundColor = '#3498db';
        container.style.borderRadius = '50%';
        container.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
        container.style.cursor = 'pointer';

        // Create the before and after pseudo-elements
        var beforeElement = document.createElement('div');
        beforeElement.style.content = "''";
        beforeElement.style.position = 'absolute';
        beforeElement.style.top = '50%';
        beforeElement.style.left = '50%';
        beforeElement.style.transform = 'translate(-50%, -50%)';
        beforeElement.style.backgroundColor = '#fff';
        beforeElement.style.width = '6px';
        beforeElement.style.height = '24px';
        container.appendChild(beforeElement);

        var afterElement = document.createElement('div');
        afterElement.style.content = "''";
        afterElement.style.position = 'absolute';
        afterElement.style.top = '50%';
        afterElement.style.left = '50%';
        afterElement.style.transform = 'translate(-50%, -50%)';
        afterElement.style.backgroundColor = '#fff';
        afterElement.style.width = '24px';
        afterElement.style.height = '6px';
        container.appendChild(afterElement);

        container.onclick = function () {
            map.setView(originalCoords, 17); // Recent the map to the original coordinates
        };

        return container;
    }
});

// Add the custom control to the map
var recenterControl = new L.Control.RecenterButton();
recenterControl.addTo(map);

