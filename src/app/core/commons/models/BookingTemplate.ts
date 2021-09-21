import {BookingPlatform} from "../constants/Constant";

/**
 * Booking Template interface.
 */
export interface BookingTemplate {
  id?: string;
  sessionId: string;
  patientNo: number;
  bookingPlatform: BookingPlatform;
  currentlyOpenedUsers: string[];
  sessionDate: Date;
  createdBy?: string;
  createdAt?: Date;
}
