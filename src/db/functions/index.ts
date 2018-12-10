import {UsersFunctions} from './users';
import {AssessmentFunctions} from './assessments';
import { LiveAssessmentFunctions } from './live_assessments';
import { GuestUsersFunctions } from './guest_users';
import { AssessmentCategoryFunctions } from './assessment_categories';
import { AssessmentQuestionFunctions } from './assessment_questions';

// Database Interface Extensions:
interface IExtensions {
    users: UsersFunctions,
    guest_users: GuestUsersFunctions,
    assessments: AssessmentFunctions,
    live_assessments: LiveAssessmentFunctions,
    assessment_categories: AssessmentCategoryFunctions
    assessment_questions: AssessmentQuestionFunctions
}

export {
    IExtensions,
    UsersFunctions,
    GuestUsersFunctions,
    AssessmentFunctions,
    LiveAssessmentFunctions,
    AssessmentCategoryFunctions,
    AssessmentQuestionFunctions
};
