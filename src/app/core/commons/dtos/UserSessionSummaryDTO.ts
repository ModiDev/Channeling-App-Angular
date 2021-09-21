import {TransactionType} from "../constants/Constant";

/**
 * The User Session Summary DTO interface.
 */
export interface UserSessionSummaryDTO {
  ConfirmedAppointments: number;
  debitTransactionSummary: TransactionSummary;
  creditTransactionSummary: TransactionSummary;
}

/**
 * The Transaction Group interface.
 */
export interface TransactionGroup {
  name: string;
  value: number;
  subject: string;
}

/**
 * The Transaction Summary interface.
 */
export interface TransactionSummary {
  groups: TransactionGroup[];
  type: TransactionType;
  total: number;
}
