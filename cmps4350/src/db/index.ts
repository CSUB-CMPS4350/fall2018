/// <reference path='@types/bluebird' />
import * as promise from 'bluebird';

//let pgp = require('./pgp');
import {IMain, IDatabase, IOptions} from 'pg-promise';
import {IExtensions, UsersFunctions} from './functions';

const initOptions: IOptions<IExtensions> = {
    promiseLib: promise,
    extend(obj: IExtensions, dc: any) {
        obj.users = new UsersFunctions(obj, pgp);
    }
};

const config = {
    host:       process.env.DB_HOST,
    port:       process.env.PGPORT,
    user:       process.env.PGUSER,
    database:   process.env.PGDATABASE,
    password:   process.env.PGPASSWORD
};

import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);
const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

export = db;