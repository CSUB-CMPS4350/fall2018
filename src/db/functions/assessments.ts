import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.assessments;

export class AssessmentFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: AssessmentColumnsets;

    private createColumnsets() {
        if (!AssessmentFunctions.cs) {
            const helpers = this.pgp.helpers, cs: AssessmentColumnsets = {};

            const table = new helpers.TableName({table: 'assessments', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                },
                {
                    name: 'uuid_',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                }
            ], {table});

            AssessmentFunctions.cs = cs;
        }
    }

    // Adds a new user, and returns the new object;
    new(values: any) {
        return this.db.one(sql.new, values);
    }

    findOne(values: any) {
        return this.db.oneOrNone(sql.findOne, values);
    }

    get() {
        return this.db.any(sql.get);
    }
}

type AssessmentColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};