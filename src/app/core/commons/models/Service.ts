import {ServiceType} from "../constants/Constant";

/**
 * The Service interface.
 */
export interface Service {
  service: ServiceType,
  doctorFee: number,
  hospitalFee: number,
  cashDiscountFee: number
}
