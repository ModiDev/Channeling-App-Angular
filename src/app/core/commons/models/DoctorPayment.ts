/**
 * Doctor Payment interface
 */
export interface DoctorPayment {
  id?: string;
  doctorId: string;
  sessionId: string;
  paymentAmount: number;
  description: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
