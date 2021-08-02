import { importGtfs } from 'gtfs';
import * as fs from 'fs';

const sqlPath = './data/sql/gtfs';
const config = {
    sqlitePath: sqlPath,
    agencies: [
        // {
        //     url: 'http://linktoyourGTFSfeed.com'
        // },
        {
            path: './data/gtfs.zip'
        }
    ]
};

if (!fs.existsSync(sqlPath)) {
    await importGtfs(config)
        .then(() => {
            console.log('Import Successful');
        })
        .catch(err => {
            console.error(err);
        });
} else {
    console.log('Data has already been imported');
}