import {UsersFunctions} from './users';
import {AssessmentFunctions} from './assessments';
import { LiveAssessmentFunctions } from './live_assessments';
import { GuestUsersFunctions } from './guest_users';

// Database Interface Extensions:
interface IExtensions {
    users: UsersFunctions,
    guest_users: GuestUsersFunctions,
    assessments: AssessmentFunctions,
    live_assessments: LiveAssessmentFunctions
}

export {
    IExtensions,
    UsersFunctions,
    GuestUsersFunctions,
    AssessmentFunctions,
    LiveAssessmentFunctions
};