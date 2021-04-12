// function createMap(earthquakeMarkers) {
    
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5
      });
      
      // Adding a tile layer (the background map image) to our map
      // We use the addTo method to add objects to our map
      L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      }).addTo(myMap);
  
    // // Create a baseMaps object to hold the lightmap layer
    // var baseMaps = {
    //   "Light Map": lightmap
    //   //"Dark Map": darkmap
    // };
  
    // // Create an overlayMaps object to hold the bikeStations layer
    // var overlayMaps = {
    //   "Earthquake": earthquakeMarkers
    // };
  
    // // Create the map object with options
    // var map = L.map("map-id", {
    //   center: [37.0902, 95.7129],
    //   zoom: 2,
    //   layers: [lightmap, earthquakeMarkers]
    // });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(map);
//   }

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(response)
{
    var data = response.features;
    //console.log(data);

    //var earthquakeMarkers = [];
    // Create a new marker cluster group
    var earthquakeMarkers = [];
    // L.markerClusterGroup();

    for(var index = 0; index < data.length; index++)
    {
        var earthquakePoint = data[index];

        // console.log(earthquakePoint.properties.mag);
        //console.log(earthquakePoint.geometry.coordinates[2]);

        var earthquakeDepth = earthquakePoint.geometry.coordinates[2];

        var color = "";
        if (earthquakeDepth < 10) {
          color = "green";
        }
        else if (earthquakeDepth = 10 && earthquakeDepth < 30) {
          color = "#ABE098";
        }
        else if (earthquakeDepth = 30 && earthquakeDepth < 50) {
          color = "#FFE301";
        }
        else if (earthquakeDepth = 50 && earthquakeDepth < 70) {
            color = "#FFA200";
        }
        else if (earthquakeDepth = 70 && earthquakeDepth < 90) {
        color = "#FF5E00";
        }
        else {
          color = "red";
        }
      
        earthquakeMarkers.push(
            L.circle([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]], 
            {
              stroke: false,
              fillOpacity: 0.5,
              color: "black",
              fillColor: color,
              radius: earthquakePoint.properties.mag * 10000
            }).bindPopup("<h1>" +  + "</h1> <hr> <h3>Points: " +  + "</h3>").addTo(myMap));

        // console.log();
        //var earthquakeMarker = L.marker([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]])
        // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
        // markers.addLayer(L.marker([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]]));
        // .bindPopup(response[i].descriptor));
      // Add the marker to the bikeMarkers array
      //earthquakeMarkers.push(earthquakeMarker);
    }
    
    var points = L.layerGroup(earthquakeMarkers);

    myMap.addLayer(points);
   // createMap(L.layerGroup(earthquakeMarkers));
});
// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
//   createMap();