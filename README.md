## GTFS Mapping App

### Overview
Express App that uses GTFS feed and creates a list of all public transport routes available. By clicking on a specific route, a show page with the map and all the stops associated with the route is shown. You can select which route direction or route option to view.
The app is built around [node-gtfs](https://github.com/BlinkTagInc/node-gtfs) module, check it out for more documentation and information about the module!

Example of this app can be found here: [heroku-link](https://salty-crag-02615.herokuapp.com/)




### Setup
In the `importGtfs.js` file, you can choose to import GTFS feed from a URL, or by downloading .zip file and placing it inside data folder

Once the URL is provided (or .zip file is placed in data folder), run 
```
node importGtfs.js
```
This will import all the data and create an sql database in data/sql folder.

### Usage
After the GTFS feed has been imported, use the following command to start the app
```
node index.js
```
