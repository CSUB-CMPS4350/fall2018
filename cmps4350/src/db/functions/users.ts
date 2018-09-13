import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');
import { UsersFunctions } from '.';

const sql = sqlProvider.users;


class UserFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: UserColumnsets;

    private createColumnsets() {
        if (!UserFunctions.cs) {
            const helpers = this.pgp.helpers, cs: UserColumnsets = {};

            const table = new helpers.TableName({table: 'pmy_users', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                },
                {
                    name: 'uuid',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                }
            ], {table});

            UsersFunctions.cs = cs;
        }
    }

    // Adds a new user, and returns the new object;
    add(values: any) {
        return this.db.one(sql.add, values);
    }
    
    find(values: any) {
        return this.db.oneOrNone(sql.find, values);
    }

    get(values: any) {
        return this.db.one(sql.get, values);
    }
}

type UserColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};