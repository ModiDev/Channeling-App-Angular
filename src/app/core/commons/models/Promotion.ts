/**
 * Promotion interface.
 */
export interface Promotion {
    addDate: Date;
    description: string;
    enterBy: string;
    expiry: Date;
    status: string;
    title: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
