import {Doctor} from "./Doctor";
import {SessionStatus} from "../constants/Constant";
import {Service} from "./Service";

/**
 * Session interface.
 */
export interface Session {
    id?: string;
    startsAt: Date;
    endsAt: Date;
    sessionDate: Date;
    status: SessionStatus;
    doctorId?: string;
    sessionMisc?: any;
    sessionLimit?: any;
    bookingCount?: number;
    doctor?: Doctor;
    limit_not_exceeded?: boolean;
    confirmedBookings: number;
    currentNumber: number;
    delayTime: number;
    reservedLimit?: number;
    availableNumbers: number[];
    services: Service[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
