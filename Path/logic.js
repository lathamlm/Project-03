locationUrl = "http://127.0.0.1:5000/api/"

d3.json(locationUrl + "location").then(function(data) {
    console.log("location:", data[0])

    // ------------------------------MAP---------------------------------
    function getColor(c) {
        return c == 311 ? "#eeaf61" :
               c == 321 ? "#fb9062" :
               c == 322 ? "#ee5d6c" :
               c == 324 ? "#abfd91" :
               c == 4247 ? "#abfd91" :               
               c == 325 ? "#82d8bd" :
               c == 4246 ? "#82d8bd" :               
               c == 326 ? "#ce4993" :
               c == 327 ? "#6a0d83" :
               c == 331 ? "#89ecda" :
               c == 332 ? "#89ecda" :
               c == 333 ? "#3bd6c6" :
               c == 334 ? "#00c2c7" :
               c == 335 ? "#43e8d8" :
               c == 562 ? "#83c57b" :
               c == 2211 ? "#798d38" :
                        "#0086ad" ;
   };

   let toxicMarkers = []
   let carcinogenMarkers = []
   let federalMarkers = []

    for(let i=0; i<data.length; i++) {
        let coords = [data[i].Latitude, data[i].Longitude]

        // ALL MARKERS
        toxicMarkers.push(
            L.circleMarker(coords, {
                stroke: true,
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.85,
                color: "#000000",
                fillColor: getColor(data[i].IndustrySectorCode),
                radius: 6,
            }).bindPopup("<strong>Facility Name: " + data[i].FacilityName + "</strong><br />Parent Company Name: " + data[i].ParentCompanyName + "<br />Coordinates: (" + data[i].Latitude
            + ", " + data[i].Longitude)
        )
        
        // CARCINOGENS MARKERS
        if(data[i].Carcinogen == "YES") {
            let carcinogenCoords = [data[i].Latitude, data[i].Longitude]
            
            carcinogenMarkers.push(
                L.circleMarker(carcinogenCoords, {
                    stroke: true,
                    weight: 0.5,
                    opacity: 1,
                    fillOpacity: 0.85,
                    color: "#000000",
                    fillColor: getColor(data[i].IndustrySectorCode),
                    radius: 6,
                }).bindPopup("<strong>Facility Name: " + data[i].FacilityName + "</strong><br />Parent Company Name: " + data[i].ParentCompanyName + "<br />Coordinates: (" + data[i].Latitude
                + ", " + data[i].Longitude)
                )
        }

        // FEDERAL FACILITY MARKERS
        if(data[i].FederalFacility == "YES") {
            let federalCoords = [data[i].Latitude, data[i].Longitude]
            
            federalMarkers.push(
                L.circleMarker(federalCoords, {
                    stroke: true,
                    weight: 0.5,
                    opacity: 1,
                    fillOpacity: 0.85,
                    color: "#000000",
                    fillColor: getColor(data[i].IndustrySectorCode),
                    radius: 6,
                }).bindPopup("<strong>Facility Name: " + data[i].FacilityName + "</strong><br />Parent Company Name: " + data[i].ParentCompanyName + "<br />Coordinates: (" + data[i].Latitude
                + ", " + data[i].Longitude)
            )
        }
   }

   // MAP LAYERS
   let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let dark = L.tileLayer('https://maps.geoapify.com/v1/tile/dark-matter-brown/{z}/{x}/{y}.png?apiKey=7f7fc155a6784ee3808455d2d7c4999f', {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
        maxZoom: 20, id: 'osm-bright'
    });

    let markers = L.layerGroup(toxicMarkers);
    let carcinogenMark = L.layerGroup(carcinogenMarkers);
    let federalMark = L.layerGroup(federalMarkers);

    let baseMaps = {
        "street map": street,
        "dark mode": dark
    };

    let overlayMaps = {
        Releases: markers,
        Carcinogen: carcinogenMark,
        Federal: federalMark
    };

    let map = L.map("map", {
        center: [39, -99],
        zoom: 4,
        layers: [street, markers]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // MAP LEGEND
    let legend = L.control({position: "bottomright"});

    legend.onAdd = function(map) {
        let div = L.DomUtil.create("div", "info legend");
        labelGroup = ["Chemicals", "Computers/Electronics", "Electric Utilities", "Electrical Equipment", "Food", "Hazardous Waste", "Machinery", "Metals", "Nonmetallic Mineral Product", "Other", "Paper", "Petroleum", "Plastics/Rubber", "Wood"],
        colors = ["#82d8bd", "#00c2c7", "#798d38", "#43e8d8", "#eeaf61", "#83c57b", "#3bd6c6", "#89ecda", "#6a0d83", "#0086ad", "#ee5d6c", "#abfd91", "#ce4993", "#fb9062"],
        labels = [];

        for(let y=0; y<colors.length; y++) {
            div.innerHTML += 
            labels.push(
                '<li style=\"background-color:' + colors[y] + '\"></i><strong>' + labelGroup[y] + '</strong>' //(labelGroup[y] ? labelGroup[y] : '+')
            )
        }

        div.innerHTML = '<ul style="list-style-type: none;">' + labels.join('<br>') + "</ul>";

        return div;
        
    };
    legend.addTo(map)

    console.log("All toxic releases: ", toxicMarkers.length)
    console.log("Carcinogen releases: ", carcinogenMarkers.length)
    console.log("Federal Facilities: ", federalMarkers.length)
    // ------------------------------END MAP----------------------------------

});

/*d3.json(locationUrl + "values").then(function(data) {
    console.log("values:", data[0])

    let regionsList = [];
    let regionOnly = [];
    let count = 0;
    let start = false;

    for(let i=0; i<data.length; i++) {
        regionsList.push(data[i].Region)
    };
});*/
