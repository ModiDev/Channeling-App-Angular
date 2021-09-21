import {TransactionSubject, TransactionType} from "../constants/Constant";

/**
 * TransactionDTO.
 */
export interface TransactionDTO {
  drawerId: string;
  amount: number;
  transactionType: TransactionType
  transactionSubject: TransactionSubject;
  createdBy: string;
}
