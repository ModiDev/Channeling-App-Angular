/**
 * Patient interface.
 */
export interface Patient {
    id?: string;
    name: string;
    nameSimple: string;
    nicOrPassport: string;
    mobile: string;
    address: string;
    age: number;
    sex: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
