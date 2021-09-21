import {Specialty} from "../constants/Constant";
import {Service} from "../models/Service";

/**
 * Create Doctor DTO.
 */
export interface CreateDoctorDTO {
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
