import {SessionStatus} from "../constants/Constant";
import {Doctor} from "../models/Doctor";
import {Service} from "../models/Service";

/**
 * Update Session DTO
 */
export interface UpdateSessionDTO {
  id: string;
  startsAt: string;
  endsAt: string;
  sessionDate: string;
  status: SessionStatus;
  doctorId?: string;
  sessionMisc?: any;
  sessionLimit?: any;
  bookingCount?: number;
  doctor?: Doctor;
  limit_not_exceeded?: boolean;
  currentNumber: number;
  delayTime: number;
  reservedLimit?: number;
  availableNumbers: number[];
  services: Service[];
}
