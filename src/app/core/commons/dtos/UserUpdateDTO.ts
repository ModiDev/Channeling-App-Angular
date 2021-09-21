/**
 * User Update interface.
 */
export interface UserUpdateDTO {
    uid: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
    terms?: boolean;
    phoneNumber: string;
}
