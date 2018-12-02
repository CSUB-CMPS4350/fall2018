"use strict";
const promise = require("bluebird");
const functions_1 = require("./functions");
const initOptions = {
    promiseLib: promise,
    extend(obj, dc) {
        obj.users = new functions_1.UsersFunctions(obj, pgp);
    }
};
const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.PGPORT),
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD
};
const pgPromise = require("pg-promise");
const pgp = pgPromise(initOptions);
const db = pgp(config);
module.exports = db;
//# sourceMappingURL=index.js.map