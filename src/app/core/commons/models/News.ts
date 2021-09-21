/**
 * News interface.
 */
interface News {
    id?: string;
    title: string;
    description: string;
    addDate: Date;
    status: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
