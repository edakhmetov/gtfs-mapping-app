import { openDb, getStops, getShapes, getRoutes } from 'gtfs';
import { ExpressError } from './ExpressError.js';
import * as fs from 'fs';

const sqlPath = './sql/gtfs';
const config = {
    sqlitePath: './sql/gtfs',
    agencies: [
        {
            path: './data/'
        }
    ]
};

if (!fs.existsSync(sqlPath)) {
    importGtfs(config)
        .then(() => {
            console.log('Import Successful');
        })
        .catch(err => {
            console.error(err);
        });
}


const db = await openDb(config);


export async function getGeoData(routeId, direction) {
    const routes = await getRoutes({
        route_id: routeId
    });
    const route = routes[0];
    const shapes = await getShapes(
        {
            route_id: routeId,
            direction_id: direction
        },
        [],
        [
            ['shape_pt_sequence', 'ASC']
        ]
    );
    const coordinates = [];
    if (!shapes.length) {
        throw new ExpressError(404, "This route doesn't have any shapes stored in the database");
    }
    for (let shape of shapes) {
        let coordinate = [shape.shape_pt_lon, shape.shape_pt_lat];
        coordinates.push(coordinate);
    };
    const stops = await getStops({
        route_id: routeId,
        direction_id: direction
    });

    return {
        route,
        coordinates,
        stops
    }
}

const allRoutes = await getRoutes();
const showRoutes = [];
for (let route of allRoutes) {
    const shapes = await getShapes({
        route_id: route.route_id
    });
    if (shapes.length) {
        showRoutes.push(route);
    }
};
export async function getRoutesData(page) {
    const count = 50;
    const start = count * (page - 1);
    const end = count * page
    const routes = showRoutes.slice(start, end);
    const length = showRoutes.length;
    return { routes, length }
}