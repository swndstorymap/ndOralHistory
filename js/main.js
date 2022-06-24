// Add all scripts to the JS folder

var map;

function createMap(){
    map = L.map('map', {
        center: [46.6746,-102.855],
        zoom: 10
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    getData(map);
};

function createPopupContent(feature){
    var popupContent = "<p><b>Name:</b> " + feature.properties.Loc_Name + 
        "</p><p><b>County:</b> " + feature.properties.Loc_County + 
        "</p><p><b>Town:</b> " + feature.properties.Loc_Town +
        "</p><p><b>Interviewee:</b> " + feature.properties.Interviewee +
        "</p><p><b>Date Range:</b> " + feature.properties.Date_rng_start + "- " + feature.properties.Date_rng_end +
        "</p><p><b>Notes:</b> " + feature.properties.Notes +
        "</p><p><b>Tags:</b> " + feature.propertiesTags;
    
    return popupContent
};

function getData(map){
    //load the data
    fetch("data/NDOralHistory.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json,{
                onEachFeature:function(feature, layer){
                    var popupContent = createPopupContent(feature);
                    
                    layer.bindPopup(popupContent)
                }
            }).addTo(map);
        })  
};



document.addEventListener('DOMContentLoaded',createMap)