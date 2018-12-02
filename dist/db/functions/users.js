"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlProvider = require("../sql");
const sql = sqlProvider.users;
class UsersFunctions {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.createColumnsets();
    }
    createColumnsets() {
        if (!UserFunctions.cs) {
            const helpers = this.pgp.helpers, cs = {};
            const table = new helpers.TableName({ table: 'pmy_users', schema: 'public' });
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
            ], { table });
            UsersFunctions.cs = cs;
        }
    }
    add(values) {
        return this.db.one(sql.add, values);
    }
    find(values) {
        return this.db.oneOrNone(sql.find, values);
    }
    get(values) {
        return this.db.one(sql.get, values);
    }
}
//# sourceMappingURL=users.js.map