import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.guest_users;


export class GuestUsersFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: GuestUserColumnsets;

    private createColumnsets() {
        if (!GuestUsersFunctions.cs) {
            const helpers = this.pgp.helpers, cs: GuestUserColumnsets = {};

            const table = new helpers.TableName({table: 'guest_users', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                }
            ], {table});

            GuestUsersFunctions.cs = cs;
        }
    }

    // Adds a new user, and returns the new object;
    add(values: any) {
        return this.db.one(sql.add, values);
    }
}

type GuestUserColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};