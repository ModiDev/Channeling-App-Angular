/**
 * Report interface.
 */
export interface Report {
    sessionId: string;
    doctor: string;
    starts_at: string;
    ends_at: string;
    user_id: string;
    username: string;
    total_revenue: number;
    profit: number;
    patient_no: string;
    patient_ref_no: string;
    patient_name: string;
    patient_contact: string;
    hospital_fee: number;
    doctor_fee: number;
    tax_rate: number | undefined;
    total_amount: number;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
