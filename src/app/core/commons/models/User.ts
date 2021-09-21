import {UserRole} from "../constants/Constant";

/**
 * User interface.
 */
export interface User {
    uid: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
    email: string;
    password: string;
    userRole: UserRole;
}
