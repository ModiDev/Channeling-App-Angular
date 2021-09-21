import {BookingPlatform, PaymentMethod} from "../constants/Constant";
import {DiscountType} from "../models/DiscountType";
import {Service} from "../models/Service";

/**
 * Create Booking Payment DTO
 */
export interface BookingPaymentDTO {
  bookingId: string;
  doctorId: string;
  sessionId: string;
  userId: string;
  paymentMethod: PaymentMethod;
  bookingPlatform: BookingPlatform;
  services: Service[];
  additionalFees?: Service[];
  discountType?: DiscountType;
}
