import {ActiveStatus} from "../constants/Constant";

/**
 * The Update Doctor Status DTO interface.
 */
export interface UpdateDoctorStatusDTO {
  id: string;
  status: ActiveStatus;
}
