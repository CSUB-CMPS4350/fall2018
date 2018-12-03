import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.users;


export class UsersFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: UserColumnsets;

    private createColumnsets() {
        if (!UsersFunctions.cs) {
            const helpers = this.pgp.helpers, cs: UserColumnsets = {};

            const table = new helpers.TableName({table: 'users', schema: 'public'});

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

    searchByEmail(values: any) {
        return this.db.any(sql.searchByEmail, values);
    }
}

type UserColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};