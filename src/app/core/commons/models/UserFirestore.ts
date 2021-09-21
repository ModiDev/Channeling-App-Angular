import {UserRole} from "../constants/Constant";

/**
 * User Firestore interface.
 */
export interface UserFirestore {
    uid: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    email?: string;
    userRole?: UserRole;
    terms?: boolean;
    active: boolean;
    currentDrawerId?: string;
    noOfConfirmedAppointments?: number;
    lastLogin?: Date,
    lastLogout?: Date,
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
