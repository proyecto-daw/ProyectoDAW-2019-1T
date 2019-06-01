const MUST_FLY_TO_CURRENT_POS = false;

var mymap = L.map('mapid').setView([-2.144463, -79.967838], 18);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox.satellite',
  accessToken: 'pk.eyJ1IjoiYWF2ZW5kYW4iLCJhIjoiY2p3NnVzdHozMjdxeDQzcXBnYjlwMTRqcyJ9.S00xReWyD9_Eb4B1h-VgIg'
}).addTo(mymap);

const markers = {
  1: [-2.144666, -79.967649, "Administración FIEC"],
  2: [-2.145418, -79.966127, "AEFIEC"],
  3: [-2.146217, -79.966816, "Sweet&Coffee"],
  4: [-2.146728, -79.966915, "Plazoleta Básico"],
  5: [-2.148555, -79.967573, "CELEX"],
  6: [-2.147574, -79.966958, "Escalera Biblioteca"],
  7: [-2.147564, -79.966132, "Biblioteca Central"],
  8: [-2.145980, -79.966291, "FEPOL"],
  9: [-2.147530, -79.968110, "Paradero FCSH"],
  10: [-2.147856, -79.968176, "Paradero CELEX"],
  11: [-2.144575, -79.968064, "Paradero FIEC"],
  12: [-2.147681, -79.968720, "Administración FCSH"],
  13: [-2.147486, -79.967866, "Auditorio FCSH"],
  14: [-2.143591, -79.967920, "Gimnasio profesores"],
  15: [-2.143048, -79.967154, "UBEP"],
  16: [-2.142373, -79.967184, "Coliseo nuevo"],
  17: [-2.144991, -79.965246, "Paradero FIMCP"],
  18: [-2.144579, -79.966075, "Administración FIMCP"]
};

const areas = {
  1: [-2.144666, -79.967649, "Toda esta Área"],
};

for (let k in markers) {
  let marker = L.marker([markers[k][0], markers[k][1]]).addTo(mymap);
  marker.bindPopup(markers[k][2]);
}
for (let k in areas) {
  let circle = L.circle([areas[k][0], areas[k][1]], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 20
  }).addTo(mymap);
  circle.bindPopup(areas[k][2]);
}

var myCurrPosMarker = L.circle([0, 0], {
  color: "green",
  fillColor: "green",
  fillOpacity: 1,
  radius: 3
}).addTo(mymap);
var myCurrPosMarkerPrecision = L.circle([0, 0], {
  color: "green",
  fillColor: "green",
  radius: 10
}).addTo(mymap);

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    myCurrPosMarker.setLatLng([latitude, longitude]);
    myCurrPosMarkerPrecision.setLatLng([latitude, longitude]);
    myCurrPosMarkerPrecision.setRadius(position.coords.accuracy);
    if (MUST_FLY_TO_CURRENT_POS && !mymap.getBounds().contains([latitude, longitude])) {
      mymap.flyTo([latitude, longitude]);
    }
  }

  function error() {
    console.error('Unable to retrieve your location');
  }

  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true
    });
  }
}
window.setInterval(function() {
  geoFindMe();
}, 2000);
