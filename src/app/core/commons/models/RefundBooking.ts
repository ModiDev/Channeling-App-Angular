/**
 * The booking refund interface.
 */
export interface RefundBooking {
  reason: string;
  amount: number;
  refundedBy: string;
  refundedAt: Date;
}
