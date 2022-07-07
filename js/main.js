// Add all scripts to the JS folder

let map;
let pointLayer;
let geoJson = {
    type: "FeatureCollection",
    name: "historyData",
    features: []
};
var markers = L.markerClusterGroup();

function createMap(){
    //create basemap
    map = L.map('map', {
        center: [46.6746,-102.855],
        zoom: 10,
        minZoom: 10,
        scrollWheelZoom: true,
        maxBounds: [
            [47.2, -103.657],
            [46.2, -102.046]
        ],
        maxZoom: 15
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
    });

    //cluster markers
    markers.addLayer(pointLayer);
    map.addLayer(markers);
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

//function to define the pop up content
function popUpContent(feature){
    this.properties = feature;
    this.formatted  = "<div class='head'><h2>" + feature.properties.Loc_Name + '</h2></div>'
                      //"<a href='" + feature.properties.Img_link + "'><img id='PO' src='" + feature.properties.Img_file + '></a>' +
                      //'<img id="PO" src="' + feature.properties.Img_file + '" width="100%" height="100%">'

    //only creates an image if an image link exists
    let popUp = this
    if(feature.properties.Img_file)
        popUp.formatted += "<div class='image'><img class= 'PO' src='" + feature.properties.Img_file + "'></div>"
                 
    this.formatted += '<p><b>Interviewee: </b>' + feature.properties.Interviewee + '<br>' +
                      '<b>Interview Date: </b>' + feature.properties.Interview_date + '</p>' +
                      '<p>' + feature.properties.Loc_Desc + '<br>' +
                      "<a href='" + feature.properties.Repos_link + "'><b>Link</b></a></p>" +
                      "<div id='audio'><audio controls class='player' id='player1' height='360'width='100%' preload='none' src='/data/intv_clip/" + feature.properties.Intv_clip + ".mp3' style='max-width: 100%' tabindex='0' title='MediaElement'></audio></div>"
    };

document.addEventListener('DOMContentLoaded',createMap)

//"<a href='" + feature.properties.Img_link + "'><img id='PO' src='" + feature.properties.Img_file + '></a>' +
