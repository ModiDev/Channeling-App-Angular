import {Specialty} from "../constants/Constant";
import {Service} from "../models/Service";

/**
 * Update Doctor DTO.
 */
export interface UpdateDoctorDTO {
  id: string;
  name: string;
  title: string;
  contact: string;
  specialty: Specialty;
  email: string;
  hospital: string;
  misc: number;
  services: Service[];
  profileImgUrl: string;
}
