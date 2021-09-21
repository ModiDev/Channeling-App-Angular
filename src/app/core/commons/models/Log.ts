import {ActionType, SubjectType} from "../constants/Constant";

/**
 * Log interface
 */
export interface Log {
  id?: string;
  name: string;
  actionType: ActionType;
  subjectType: SubjectType;
  subjectId: string;
  url?: string;
  message?: string;
  createdBy: string;
  createdAt: Date;
}
