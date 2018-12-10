import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.assessment_questions;


export class AssessmentQuestionFunctions {
    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        
        this.createColumnsets();
    }

    private db: IDatabase<any>;
    private pgp: IMain;
    private static cs: AssessmentQuestionColumnsets;

    private createColumnsets() {
        if (!AssessmentQuestionFunctions.cs) {
            const helpers = this.pgp.helpers, cs: AssessmentQuestionColumnsets = {};

            const table = new helpers.TableName({table: 'assessment_questions', schema: 'public'});

            cs.insert = new helpers.ColumnSet([
                {
                    name: 'id',
                    mod: ':raw',
                    init: () => 'DEFAULT'
                },
            ], {table});

            AssessmentQuestionFunctions.cs = cs;
        }
    }

    
    insertQuestion(values: any) {
        return this.db.one(sql.insertQuestion, values);
    }
}

type AssessmentQuestionColumnsets = {
    insert?: ColumnSet,
};
