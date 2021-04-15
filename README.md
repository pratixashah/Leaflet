# United States Geological Survey with Leaflet

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. USGS collects a massive amount of earthquake data from all over the world each day. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the USGS GeoJSON Feed page and pused all Earthquakes from the Past 7 Days data. 
 
## Visualization on Earthquake Data:

**1. Leaflet-Step-1**  

**Data Source:** JSON Data (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
**Script:** js/app.js
**Landing Page:** index.html

- A map using Leaflet that plots all of the earthquakes from json data set based on their longitude and latitude.
- A data markers reflects the magnitude of the earthquake by their size.
- A depth of the earthquake represented by color.
- A popups that provide additional information about the earthquake when a marker is clicked.
- A legend that will provide context for map data.

**2. Leaflet-Step-2** 

**Data Source:** JSON Data (https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)
**Script:** js/app.js
**Landing Page:** index.html

- To illustrate the relationship between tectonic plates and seismic activity on map.
- Adds a number of base maps like Satelite, Grayscale and Outdoors to choose from.  
- Displays two different data sets Earthquakes and Tectonic Plates into overlays that can be turned on and off independently.
