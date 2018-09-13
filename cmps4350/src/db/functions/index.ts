import {UsersFunctions} from './users';

// Database Interface Extensions:
interface IExtensions {
    users: UsersFunctions
}

export {
    IExtensions,
    UsersFunctions
};