import {BookingPlatform, PaymentMethod} from "../constants/Constant";

/**
 * Booking Payment interface.
 */
export interface BookingPayment {
  id?: string;
  bookingId: string;
  doctorId: string;
  sessionId: string;
  bookingPlatform: BookingPlatform;
  paymentMethod: PaymentMethod;
  totalPayment: number;
  totalDoctorPayment: number;
  refundValue?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
