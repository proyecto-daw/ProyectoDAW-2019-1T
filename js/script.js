var mymap = L.map('mapid').setView([-2.144463, -79.967838], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWF2ZW5kYW4iLCJhIjoiY2p3NnVzdHozMjdxeDQzcXBnYjlwMTRqcyJ9.S00xReWyD9_Eb4B1h-VgIg'
}).addTo(mymap);

var marker = L.marker([-2.144463, -79.967838]).addTo(mymap);

var circle = L.circle([-2.144463, -79.967838], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 20
}).addTo(mymap);

marker.bindPopup("<b>FIEC</b><br>").openPopup();
circle.bindPopup("Toda esta Ã¡rea");