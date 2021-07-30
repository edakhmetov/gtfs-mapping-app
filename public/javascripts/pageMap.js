mapboxgl.accessToken = accessToken;
const centre = Math.floor(coordinates.length / 2);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates[centre],
    zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
});

stops.forEach(function (stop) {
    const stopCor = [stop.stop_lon, stop.stop_lat]
    new mapboxgl.Marker()
        .setLngLat(stopCor)
        .setPopup(new mapboxgl.Popup().setHTML(`<h5>${stop.stop_name}</h5>`))
        .addTo(map)
})