import {UserRole} from "../constants/Constant";

/**
 * The User Sign Up DTO.
 */
export interface UserSignUpDTO {
    uid?: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    password: string;
    terms?: boolean;
    userRole: UserRole;
}
