import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.live_assessments;

export class LiveAssessmentFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: LiveAssessmentColumnsets;

    private createColumnsets() {
        if (!LiveAssessmentFunctions.cs) {
            const helpers = this.pgp.helpers, cs: LiveAssessmentColumnsets = {};

            const table = new helpers.TableName({table: 'live_assessments', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                }
            ], {table});

            LiveAssessmentFunctions.cs = cs;
        }
    }

    add(values: any) {
        return this.db.one(sql.add, values);
    }

    findOnePin(values: any) {
        return this.db.oneOrNone(sql.findOnePin, values);
    }
}

type LiveAssessmentColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};