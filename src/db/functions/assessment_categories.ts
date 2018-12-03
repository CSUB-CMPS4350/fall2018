import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.assessment_categories;

export class AssessmentCategoryFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: AssessmentCategoryColumnsets;

    private createColumnsets() {
        if (!AssessmentCategoryFunctions.cs) {
            const helpers = this.pgp.helpers, cs: AssessmentCategoryColumnsets = {};

            const table = new helpers.TableName({table: 'assessment_categories', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                },
            ], {table});

            AssessmentCategoryFunctions.cs = cs;
        }
    }

    // Adds a new user, and returns the new object;
    insertCategory(values: any) {
        return this.db.oneOrNone(sql.insertCategory, values);
    }

    selectByPage(page: number) {
        return this.db.any(sql.selectByPage, page);
    }
}

type AssessmentCategoryColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};