/**
 * Doctor Payment DTO
 */
export interface DoctorPaymentDTO {
  doctorId: string;
  sessionId: string;
  paymentAmount: number;
  description: string;
}
