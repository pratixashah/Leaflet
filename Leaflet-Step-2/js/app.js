function createMap(earthquakeMarkers) {
    
    var myMap = L.map("map", {
        center: [38.80, -116.41],
        zoom: 6
      });
      
      // Adding a tile layer (the background map image) to our map
      // We use the addTo method to add objects to our map
      var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });
  
     
    // // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Satelite":sateliteMap,
      "Grayscale": lightMap,
      "Outdoors":outdoorMap
      
      //"Dark Map": darkmap
    };
  
    // // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": earthquakeMarkers
    };
  
    // // Create the map object with options
    // var map = L.map("map-id", {
    //   center: [37.0902, 95.7129],
    //   zoom: 2,
    //   layers: [lightmap, earthquakeMarkers]
    // });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) 
{

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["-10-10", "10-30", "30-50", "50-70", "70-90", "+90"],
        labels = ["#7FFF00","#CDD704","#FFE301","#FFA200","#FF5E00","#F70D1B"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) 
    {
        div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i><label> ' +  grades[i] + '</label><br/>';
    }

    return div;
};
    var points = L.layerGroup(earthquakeMarkers);

    legend.addTo(myMap);
    myMap.addLayer(points);
  }

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

        //console.log(earthquakeDepth);
        var color = "";
        if (earthquakeDepth < 10) {
          color = "#7FFF00";
        }
        else if (earthquakeDepth >= 10 && earthquakeDepth < 30) {
          color = "#CDD704";
        }
        else if (earthquakeDepth >= 30 && earthquakeDepth < 50) {
          color = "#FFE301";
        }
        else if (earthquakeDepth >= 50 && earthquakeDepth < 70) {
            color = "#FFA200";
        }
        else if (earthquakeDepth >= 70 && earthquakeDepth < 90) {
        color = "#FF5E00";
        }
        else {
          color = "#F70D1B";
        }
      
        earthquakeMarkers.push(
            L.circle([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]], 
            {
              stroke: true,
              weight:1,
              fillOpacity: 1,
              color: "black",
              fillColor: color,
              radius: earthquakePoint.properties.mag * 8000
            //   paint:{
            //     "circle-border": 1,
            //     "stroke-width":1
            //   }
            }).bindPopup("<h4>Place: " + earthquakePoint.properties.place +
             "</h4> <hr> <h5>Magnitude: " + earthquakePoint.properties.mag + 
             "</h5><h5>Depth of earthquake: " + earthquakeDepth + "</h5>"
             ));

        // console.log();
        //var earthquakeMarker = L.marker([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]])
        // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
        // markers.addLayer(L.marker([earthquakePoint.geometry.coordinates[1], earthquakePoint.geometry.coordinates[0]]));
        // .bindPopup(response[i].descriptor));
      // Add the marker to the bikeMarkers array
      //earthquakeMarkers.push(earthquakeMarker);
    

}


   createMap(L.layerGroup(earthquakeMarkers));
});
// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
//   createMap();

