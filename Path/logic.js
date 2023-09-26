locationUrl = "http://127.0.0.1:5000/api/"
d3.json(locationUrl + "location").then(function(data) {
    console.log("location:", data)
});

/*d3.json(locationUrl + "values").then(function(data) {
    console.log("values:", data)
});*/

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let dark = L.tileLayer('https://maps.geoapify.com/v1/tile/dark-matter-brown/{z}/{x}/{y}.png?apiKey=7f7fc155a6784ee3808455d2d7c4999f', {
    attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    maxZoom: 20, id: 'osm-bright'
});

let toxicMarkers = [];

let markers = L.layerGroup(toxicMarkers);

let baseMaps = {
    "street map": street,
    "dark mode": dark
};

let overlayMaps = {
    Releases: markers
};

let map = L.map("map", {
    center: [39, -99],
    zoom: 4,
    layers: [street, markers]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

console.log(regionData);
