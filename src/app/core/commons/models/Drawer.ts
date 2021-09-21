import {ActiveStatus} from "../constants/Constant";

/**
 * Drawer interface.
 */
export interface Drawer {
  id?: string;
  number: string;
  name: string;
  description: string;
  currentBalance: number;
  status: ActiveStatus;
  currentSessionId?:number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
