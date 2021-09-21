import {BookingPlatform} from "../constants/Constant";

/**
 * Booking Template interface.
 */
export interface BookingTemplateCreateDTO {
  sessionId: string;
  bookingPlatform: BookingPlatform;
}
