import {Service} from "./Service";
import {ActiveStatus, Specialty} from "../constants/Constant";

/**
 * Doctor interface.
 */
export interface Doctor {
  id?: string;
  name: string;
  email: string;
  hospital: string;
  misc: number;
  nameSimple: string;
  title: string;
  contact: string;
  specialty: Specialty;
  services: Service[];
  profileImgUrl: string;
  status: ActiveStatus;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
