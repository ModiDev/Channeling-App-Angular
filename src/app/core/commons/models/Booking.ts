import {ActiveStatus, BookingPlatform, BookingStatus, PatientConfirmationType, PaymentMethod} from "../constants/Constant";
import {Doctor} from "./Doctor";
import {Patient} from "./Patient";
import {Service} from "./Service";
import {DiscountType} from "./DiscountType";
import {Employee} from "./Employee";
import {RefundBooking} from "./RefundBooking";

/**
 * Booking interface.
 */
export interface Booking {
    id?: string;
    status: ActiveStatus;
    doctorId: string;
    bookingStatus: BookingStatus;
    patientId: string;
    sessionId: string;
    referenceNo: string;
    patientNo: number;
    doctor?: Doctor;
    patient?: Patient;
    patientName: string;
    patientNameSimple?: string;
    patientContactNo?: string;
    bookingPlatform: BookingPlatform;
    paymentMethod: PaymentMethod;
    services: Service[];
    additionalFees?: Service[];
    discountType?: DiscountType;
    discountTypeName?: string;
    employee?: Employee;
    sessionDate: Date;
    sessionStartsAt: Date;
    sessionEndsAt: Date;
    patientConfirmation: PatientConfirmationType,
    refund?: RefundBooking;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
