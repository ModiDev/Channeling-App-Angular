import {AppointmentsSortBy} from "../constants/Constant";

/**
 * The Get Appointments DTO interface.
 */
export default interface AppointmentsGetDTO {
  searchText: string;
  orderBy?: AppointmentsSortBy;
  pageNumber: number;
  itemCountPerPage: number;
}
