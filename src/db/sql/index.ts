import {QueryFile, TQueryFileOptions} from 'pg-promise';

const path = require('path');

export = {
    users: {
        add: sql('users/add.sql'),
        find: sql('users/find.sql'),
        get: sql('users/get.sql'),
        searchByEmail: sql('users/search/searchByEmail.sql')
    },
    guest_users: {
        add: sql('guest_users/add.sql'),
    },
    assessments: {
        new: sql('assessments/new.sql'),
        findOne: sql('assessments/findOne.sql'),
        get: sql('assessments/get.sql'),
        getOne: sql('assessments/getOne.sql')
    },
    live_assessments: {
        add: sql('live_assessments/add.sql'),
        findOnePin: sql('live_assessments/findOnePin.sql')
    },
    assessment_categories: {
        insertCategory: sql('assessment_categories/insert_category.sql'),
        selectByPage: sql('assessment_categories/select_byN.sql')
    },
    assessment_questions: {
        insertQuestion: sql('assessment_questions/insert_question.sql')
    }
};

function sql(file: string): QueryFile {
    const fullPath: string = path.join(__dirname, file);

    const options: TQueryFileOptions = {
        minify: true,
        params: {
            schema: 'public', // replace ${schema~} with "public"
            users: 'users',
            guest_users: 'guest_users',
            jwt: 'jwt',
            roles: 'roles',
            assessments: 'assessments',
            live_assessments: 'live_assessments'
        }
    };

    const queryfile: QueryFile = new QueryFile(fullPath, options);

    if (queryfile.error) {
        console.error(queryfile.error);
    }

    return queryfile;
}
