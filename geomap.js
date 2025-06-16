// Define layers for assigning shapes
var layer_things1;
var layer_things2;
var map;
var userIsPhone = false;

function draw_map(){

  let custom_map_height = window.innerHeight - 115;
  // add a check to see if user is on mobile and set a different map height accordingly
  if (window.innerWidth<=768){
    custom_map_height = custom_map_height - 60;
    userIsPhone = true;
  }
  document.getElementById('map').setAttribute("style","height:"+(custom_map_height)+"px");

  // Add a tile layer (you can change to other providers if needed)
  var def_Map = L.tileLayer('https://{s}.tile. .org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    zoomSnap: 0.1,
  });

  // make layer grousp for the markers - visist and images
  layer_things1 = L.featureGroup();
  layer_things2 = L.featureGroup();

  // create dictionaries for baseMaps - in this case only the default map
  // this is a neede variable while making a layer control
  var baseMaps = {
    "Deafult Map": def_Map
  }
  // create a dictionary for different overlays - these will appear as checkbox
  var overlays = {
    "Layer 2": layer_things2,
    "Layer 1": layer_things1
  };

  // initiate the map and select default map tile and selected checkboxes
  map = L.map('map',{
    layers: [def_Map, layer_things1, layer_things2]
  });

  // initialize the control which can be interacted with
  var layerControl = L.control.layers(baseMaps,overlays).addTo(map);

  var baseMapOverlay_width = 187;
  var baseMapOverlay_height = 92;
  var latLngMapImage = L.latLngBounds([[-(baseMapOverlay_height/2),-(baseMapOverlay_width/2)],[baseMapOverlay_height/2,baseMapOverlay_width/2]]);
  console.log(latLngMapImage);
  var baseMapOverlay = L.imageOverlay("data/map_img/gia_map.png", latLngMapImage, {
    opacity: 0.8,
    interactive: true
  }).addTo(map);

  map.fitBounds(latLngMapImage);

  // setup first province map for Yearndale
  // var yearndale_center = [-17.9787, 3.8672];
  var yearndale_center = [4.56, -18.27];
  var layerScale = 3;
  latLngMapImage = L.latLngBounds([[yearndale_center[1]-7.18/layerScale, yearndale_center[0]-10.2/layerScale], [yearndale_center[1]+7.18/layerScale, yearndale_center[0]+10.2/layerScale]]);  
  imageOverlay = L.imageOverlay("data/map_img/yearndale_valley.jpg", latLngMapImage, {
    opacity: 0.8,
    interactive: true
  }).addTo(map);
    map.fitBounds(latLngMapImage);

  // map.fitBounds(latLngMapImage);

}

function setup_map(){

  
}

// Toggle popup visibility
function toggleGeomapInfoPopup() {
  const infoPopup = document.getElementById('info-popup');
  infoPopup.classList.toggle('hidden');
  document.getElementById('info-popup-byDate').classList.toggle('hidden');

}

// Show popup on page load
window.onload = function() {
  document.getElementById('info-popup').classList.remove('hidden');
  L.DomEvent.disableScrollPropagation(document.getElementById('info-popup-byDate'));
  L.DomEvent.disableClickPropagation(document.getElementById('info-popup-byDate'));

  // DEBUG MODE

  document.getElementById('info-popup-byDate').style.setProperty('display', 'none', 'important');
  document.getElementById('info-popup').classList.add('hidden');

  map.on('click', function(e){
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log("Lat/Long: " + lat + ", " + lng);
  });
};