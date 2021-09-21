import {TransactionSubject, TransactionType} from "../constants/Constant";
import {Drawer} from "./Drawer";

/**
 * Transaction interface.
 */
export interface Transaction {
  id?: string;
  currentBalanceTotal: number;
  drawers: Drawer[];
  transactionType: TransactionType;
  transactionSubject: TransactionSubject;
  updatedAmount: number;
  updatedDrawerId: string;
  createdBy?: string;
  createdAt?: Date;
}
