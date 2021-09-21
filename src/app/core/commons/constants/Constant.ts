/**
 * User Role interface.
 */
export interface UserRole {
  isAdmin?: boolean;
  isUser: boolean;
}

/**
 * The Admin Role.
 */
export const SysAdminRole: UserRole = {
  isUser: true,
  isAdmin: true,
};

/**
 * The Team Member Role.
 */
export const SysUserRole: UserRole = {
  isUser: true,
  isAdmin: false,
};

/**
 * Payment Method.
 */
export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
}

/**
 * Transaction Type.
 */
export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

/**
 * Transaction Subject.
 */
export enum TransactionSubject {
  DOCTOR_PAYMENT = "DOCTOR-PAYMENT",
  BOOKING_PAYMENT = "BOOKING-PAYMENT",
  BOOKING_REFUND = "BOOKING-REFUND",
  DRAWER_TRANSFER = "DRAWER-TRANSFER",
  OTHER_PAYMENT = "OTHER-PAYMENT",
}


/**
 * Payment Status.
 */
export enum PaymentStatus {
  PAID = "PAID",
  DUE = "DUE",
}

/**
 *  Booking Status.
 */
export enum BookingStatus {
  TENTATIVE = "TENTATIVE",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

/**
 *  Active Status.
 */
export enum ActiveStatus {
  ACTIVE = "ACTIVE",
  DE_ACTIVE = "DE-ACTIVE",
  DELETE = "DELETE",
}

/**
 *  Book From.
 */
export enum BookingPlatform {
  WEB = "WEB",
  APP = "APP",
}

/**
 *  Appointment sort by.
 */
export enum AppointmentsSortBy {
  REF_NO = "REF-NO",
  REF_NO_DESC = "REF-NO-DESC",
  NAME = "NAME",
  NAME_DESC = "NAME-DESC",
  DOCTOR = "DOCTOR",
  DOCTOR_DESC = "DOCTOR-DESC",
  SESSION = "SESSION",
  SESSION_DESC = "SESSION-DESC",
  PATIENT_NO = "PATIENT-NO",
  PATIENT_NO_DESC = "PATIENT-NO-DESC"
}

/**
 *  Session status
 */
export enum SessionStatus {
  PENDING = "PENDING",
  BLOCKED = "BLOCKED",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED"
}

/**
 *  Action Types
 */
export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  CANCEL = "CANCEL",
  DELETE = "DELETE",
  GET = "GET",
  AUTH = "AUTH",
}

/**
 *  Subject Types
 */
export enum SubjectType {
  BOOKING = "BOOKING",
  BOOKING_TEMPLATE = "BOOKING-TEMPLATE",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  REPORT = "REPORT",
  SESSION = "SESSION",
  TRANSACTION = "TRANSACTION",
  USER = "USER",
  DRAWER = "DRAWER",
  DISCOUNT_TYPE = "DISCOUNT-TYPE",
}

/**
 *  Service Types.
 */
export enum ServiceType {
  CHANNELING = "Channeling",
  EEG = "EEG",
  HOLTER_MONITOR = "Holter Monitor",
  FNAC_SCAN = "FNAC Scan",
  ECHO = "ECHO",
  X_RAY = "X-RAY Report",
  DOPLEX = "Doplex",
  DOPLEX_BOTH = "Doplex Both",
  USS = "USS/ ABD/ KUB/ Soft Tissue/ Neck Scan",
}

/**
 *  Patient Confirmation Types.
 */
export enum PatientConfirmationType {
  DEFAULT = "",
  ANSWERED = "ANSWERED",
  NOT_ANSWERED = "NOT-ANSWERED",
  WRONG_NUMBER = "WRONG-NUMBER",
  NOT_WORKED = "NOT-WORKING",
  ARRIVED = "ARRIVED",
  CANCELLED = "CANCELLED",
  NOT_SURE = "NOT-SURE",
  ON_THE_WAY = "ON-THE-WAY",
  CONFIRMED = "CONFIRMED"
}

/**
 *  Doctor Specialty Types.
 */
export enum Specialty {
  CARDIOLOGIST = "CARDIOLOGIST",
  CHEST_PHYSICIAN = "CHEST PHYSICIAN",
  DERMATOLOGIST = "DERMATOLOGIST",
  ENDOCRINOLOGIST = "ENDOCRINOLOGIST",
  ENT_SURGEON = "ENT SURGEON",
  EYE_SURGEON = "EYE SURGEON",
  GENITOURINARY_SURGEON = "GENITOURINARY SURGEON",
  GYNECOLOGIST = "GYNECOLOGIST",
  NEPROLOGIST = "NEPROLOGIST",
  NEUROLOGIST_PHYSICIAN = "NEUROLOGIST PHYSICIAN",
  ORTHOPEDIC_SURGEON = "ORTHOPEDIC SURGEON",
  PEDIATRICIAN = "PEDIATRICIAN",
  PSYCHIATRIC = "PSYCHIATRIC",
  RADIOLOGIST = "RADIOLOGIST",
  RHEUMATOLOGIST = "RHEUMATOLOGIST",
  SURGEON = "SURGEON",
  VENEREOLOGIST_STD = "VENEREOLOGIST(STD)",
  VISITING_PHYSICIAN = "VISITING PHYSICIAN",
  GASTRO = "GASTRO",
  FNAC_FNAC = "FNAC/FNAC",
  PHYSIOTHERAPIST = "PHYSIOTHERAPIST",
  SPEECH_THERAPIST = "SPEECH THERAPIST",
}
