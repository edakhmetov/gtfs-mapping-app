## GTFS Mapping App
Simple App that uses GTFS feed and creates a list of all public transport routes available. By clicking on a specific route, a show page with the map and all the stops associated with the route is shown. You can select which route direction or route option to view. 


### Setup
In the `importGtfs.js` file, you can choose to import GTFS feed from a URL, or by downloading .zip file and placing it inside data folder

Once the URL is provided (or .zip file is placed in data folder), run 
```
node importGtfs.js
```
This will import all the data and create an sql database in data/sql folder.