import { } from 'dotenv/config'
import path from 'path';
import express from 'express';
import { dirname } from 'path';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from 'url';
import { wrapAsync } from './utils/WrapAsync.js';
import { ExpressError } from './utils/ExpressError.js';
import { getGeoData, getRoutesData } from './utils/getGeoData.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', wrapAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const { routes, length } = await getRoutesData(page);
    res.render('index', { routes, length, page });
}));

app.get('/:id', wrapAsync(async (req, res, next) => {
    const { direction = 0, routeOption = 0 } = req.query;
    const routeId = req.params.id;
    const { coordinates, route, stops, uniqueShapes } = await getGeoData(routeId, direction, routeOption);
    res.render('show', { coordinates, stops, route, uniqueShapes, routeOption, direction });
}));

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
    const { statusCode = 400 } = err;
    if (!err.message) err.message = 'Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`on port ${port}`);
});

