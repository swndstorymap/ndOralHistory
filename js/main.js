// Add all scripts to the JS folder

let map;
let pointLayer;
let geoJson = {
    type: "FeatureCollection",
    name: "historyData",
    features: []
};
var markers = L.markerClusterGroup();

//change marker to custom icon
L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'img/ND_icon.png',
    shadowUrl: 'lib/leaflet/images/marker-shadow.png',
    shadowSize: [30, 41],
    shadowAnchor: [10, 20],
    iconSize: [25, 41],
    popupAnchor: [0, -20],
});

function createMap(){
    //create basemap
    map = L.map('map', {
        center: [46.9, -102.42],
        zoom: 9,
        minZoom: 9,
        scrollWheelZoom: true,
        maxBounds: [
            [48.15, -104.89],
            [45.92, -100.02]
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
                if(data.longitude && data.latitude)
                feature.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                };
                //for loop turns csv columns into feature properties
                for (const property in data){
                    feature.properties[property] = data[property];
                }
            //pushes feature into geoJson created at the beginning of the script, ensures feature has a value for interviewee and coordinates
            if(feature.properties.interviewee && data.longitude && data.latitude)
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
    this.formatted = "<div class='popUp'>"

    //only creates an image if an image link exists
    if(feature.properties.img_name)
        this.formatted += "<div class='image'><a href='" + feature.properties.img_link + "'><img class= 'PO' src='img/" + feature.properties.img_name + "'></a></div>"
                 
    this.formatted += "<div class='head'><h1>" + feature.properties.loc_name + '</h1></div>' +
                      '<p class="b">' + feature.properties.loc_desc + '<br>'

    if(feature.properties.repos_link)
        this.formatted += "<a href='" + feature.properties.repos_link + "'>Find out more</a></p>"

    this.formatted += '<p class="a"><b>Interviewee: </b>' + feature.properties.interviewee + '<br>' +
                      '<b>Interview Date: </b>' + feature.properties.intv_date + '</p>'

    if(feature.properties.intv_clip)
        this.formatted += "<div id='audio'><audio controls class='player' id='player1' height='360'width='100%' preload='none' src='data/intv_clip/" + feature.properties.intv_clip + ".mp3' style='max-width: 100%' tabindex='0' title='MediaElement'></audio></div>" +
        '</div>'
    };

document.addEventListener('DOMContentLoaded',createMap)