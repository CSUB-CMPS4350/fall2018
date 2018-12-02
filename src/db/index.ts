
import {Promise} from 'bluebird';

//let pgp = require('./pgp');
import {IMain, IDatabase, IOptions} from 'pg-promise';
import {IExtensions, UsersFunctions, AssessmentFunctions, LiveAssessmentFunctions, GuestUsersFunctions} from './functions';

const initOptions: IOptions<IExtensions> = {
    promiseLib: Promise,
    extend(obj: IExtensions, dc: any) {
        obj.users = new UsersFunctions(obj, pgp);
        obj.guest_users = new GuestUsersFunctions(obj, pgp);
        obj.assessments = new AssessmentFunctions(obj, pgp);
        obj.live_assessments = new LiveAssessmentFunctions(obj, pgp);
    }
};

const config = {
    host:       process.env.DB_HOST,
    port:       parseInt(process.env.PGPORT),
    user:       process.env.PGUSER,
    database:   process.env.PGDATABASE,
    password:   process.env.PGPASSWORD
};

import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);
const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

export {db, pgp};