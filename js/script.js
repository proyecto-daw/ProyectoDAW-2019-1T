const MUST_FLY_TO_CURRENT_POS = false;

var mymap = L.map('mapid', {
  scrollWheelZoom: false
}).setView([-2.144463, -79.967838], 18);
mymap.on('click', () => {
  mymap.scrollWheelZoom.enable();
});
mymap.on('mouseout', () => {
  mymap.scrollWheelZoom.disable();
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox.streets-satellite',
  accessToken: 'pk.eyJ1IjoiYWF2ZW5kYW4iLCJhIjoiY2p3NnVzdHozMjdxeDQzcXBnYjlwMTRqcyJ9.S00xReWyD9_Eb4B1h-VgIg'
}).addTo(mymap);

var markers;

var areas;

$(document).ready(function() {
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/waypoints",
    success: function(data, status) {
      markers = data.waypoints;

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
    }
  });

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/areas",
    success: function(data, status) {
      areas = data.areas;

      for (let k in areas) {
        let circle = L.circle([areas[k][0], areas[k][1]], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 20
        }).addTo(mymap);
        circle.bindPopup(areas[k][2]);
      }
    }
  });
});

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
