"use strict";
const pg_promise_1 = require("pg-promise");
const path = require('path');
function sql(file) {
    const fullPath = path.join(__dirname, file);
    const options = {
        minify: true,
        params: {
            schema: 'public'
        }
    };
    const queryfile = new pg_promise_1.QueryFile(fullPath, options);
    if (queryfile.error) {
        console.error(queryfile.error);
    }
    return queryfile;
}
module.exports = {
    users: {
        add: sql('users/add.sql'),
        find: sql('users/find.sql'),
        get: sql('users/get.sql')
    }
};
//# sourceMappingURL=index.js.map