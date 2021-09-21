import {ActiveStatus, BookingPlatform, BookingStatus, PaymentMethod} from "../constants/Constant";
import {Patient} from "../models/Patient";
import {Service} from "../models/Service";

/**
 * Create Booking DTO
 */
export interface CreateBookingDTO {
  status: ActiveStatus;
  doctorId: string;
  bookingTemplateId?: string;
  bookingStatus: BookingStatus;
  patientId: string;
  sessionId: string;
  referenceNo: string;
  patientNo: number;
  patient?: Patient;
  patientName: string;
  bookingPlatform: BookingPlatform;
  paymentMethod: PaymentMethod;
  services: Service[];
  additionalFees?: Service[];
  discountTypeId?: string;
  employeeId?: string;
}
