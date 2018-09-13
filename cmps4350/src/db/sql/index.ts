import {QueryFile, TQueryFileOptions} from 'pg-promise';

const path = require('path');

export = {
    users: {
        add: sql('users/add.sql'),
        find: sql('users/find.sql'),
        get: sql('users/get.sql')
    }
};

function sql(file: string): QueryFile {
    const fullPath: string = path.join(__dirname, file);

    const options: TQueryFileOptions = {
        minify: true,
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    };

    const queryfile: QueryFile = new QueryFile(fullPath, options);

    if (queryfile.error) {
        console.error(queryfile.error);
    }

    return queryfile;
}