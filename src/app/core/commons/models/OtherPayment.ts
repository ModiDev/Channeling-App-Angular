/**
 * Other payment interface.
 */
export interface OtherPayment {
  drawerId: string;
  description: string;
  paymentAmount: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
