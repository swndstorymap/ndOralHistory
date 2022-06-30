// Add all scripts to the JS folder

let map;
let pointLayer;
let geoJson = {
    type: "FeatureCollection",
    name: "historyData",
    features: []
};

function createMap(){
    //create basemap
    map = L.map('map', {
        center: [46.6746,-102.855],
        zoom: 10,
        minZoom: 10,
        scrollWheelZoom: false,
        maxBounds: [
            [47.084, -103.657],
            [46.6, -102.046]
        ]
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    getData();
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

/*
function getData(){
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
*/

//function to retrieve the data and place it on the map
function getData(){
    //Papaparse library reads csvs - more info here: https://www.papaparse.com/
    Papa.parse('data/NDOralHistory.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => {
            results.data.forEach(function(data){
                //creates feature to contain story data
                let feature = {}
                feature.type = "Feature";
                feature.properties = {};
                feature.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(data.Longitude), parseFloat(data.Latitude)]
                };
                //for loop turns csv columns into feature properties
                for (const property in data){
                    feature.properties[property] = data[property];
                }
            //pushes feature into geoJson created at the beginning of the script
            if(feature.properties.Interviewee)
            geoJson.features.push(feature)
            });
            //add data to the map
            addData();
        }
    })
};

//function to add data to the map
function addData(){
    pointLayer = L.geoJson(geoJson,{
        onEachFeature:function(feature, layer){
            return onEachFeature(feature, layer)
        }
    })
    .addTo(map);
};

//function to bind popups to points
function onEachFeature(feature, layer){
    //create new popup content
    var popupContent = new popUpContent(feature.properties);

    //bind the popup to the  marker    
    layer.bindPopup(popupContent.formatted);

    //return the marker to the L.geoJson pointToLayer option
    return layer;
};

//fucntion to define the pop up content
function popUpContent(properties){
    this.properties = properties;
    this.formatted  = "<p><b>" + properties.History + "</b></p>" + 
                      "<p style='width: 100%; text-align: center'><a href='" + properties['Permanent Link'] + "'>View Story</a></p>"
    };


document.addEventListener('DOMContentLoaded',createMap)