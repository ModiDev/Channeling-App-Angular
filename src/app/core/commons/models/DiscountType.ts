import {ActiveStatus} from "../constants/Constant";

/**
 * The Discount Type interface.
 */
export interface DiscountType {
  id?: string;
  name: string;
  nameLowerCase: string;
  value: number;
  status: ActiveStatus;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
