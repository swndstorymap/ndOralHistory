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
                //only get geometry for those points with lat/lon values
                if(data.Longitude && data.Latitude)
                feature.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(data.Longitude), parseFloat(data.Latitude)]
                };
                //for loop turns csv columns into feature properties
                for (const property in data){
                    feature.properties[property] = data[property];
                }
            //pushes feature into geoJson created at the beginning of the script, ensures feature has a value for interviewee and coordinates
            if(feature.properties.Interviewee && data.Longitude && data.Latitude)
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
    var popupContent = new popUpContent(feature);

    //bind the popup to the  marker    
    layer.bindPopup(popupContent.formatted);

    //return the marker to the L.geoJson pointToLayer option
    return layer;
};

//fucntion to define the pop up content
function popUpContent(feature){
    this.properties = feature;
    this.formatted  = '<h3>' + feature.properties.Loc_Name + '</h3>' +
                      '<p>' + feature.properties.Loc_Desc + '<br>' +
                      "<a href='" + feature.properties.Repos_link + "'><b>Link</b></a></p>" +
                      "<div id='audio'><audio autoplay controls class='player' id='player1' height='360'width='100%' preload='none' src='/data/intv_clip/CHE_SK_20210618_LDV_001.wav' style='max-width: 100%' tabindex='0' title='MediaElement'></audio></div>"
    };

document.addEventListener('DOMContentLoaded',createMap)