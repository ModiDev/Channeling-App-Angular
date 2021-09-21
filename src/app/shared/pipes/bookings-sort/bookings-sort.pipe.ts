import {Pipe, PipeTransform} from '@angular/core';
import {AppointmentsSortBy} from 'src/app/core/commons/constants/Constant';
import {Booking} from 'src/app/core/commons/models/Booking';

@Pipe({
  name: 'bookingsSort'
})
export class BookingsSortPipe implements PipeTransform {

  transform(bookings: Booking[], sortBy: string, currentSort: string): Booking[] {
    switch (sortBy) {
      case AppointmentsSortBy.REF_NO:
        sortBy = currentSort === AppointmentsSortBy.REF_NO ? AppointmentsSortBy.REF_NO_DESC : AppointmentsSortBy.REF_NO;
        currentSort === AppointmentsSortBy.REF_NO ?
          bookings.sort((a, b) => a.referenceNo.localeCompare(b.referenceNo)) :
          bookings.sort((a, b) => b.referenceNo.localeCompare(a.referenceNo));
        currentSort = sortBy;
        break;
      case AppointmentsSortBy.NAME:
        sortBy = currentSort === AppointmentsSortBy.NAME ? AppointmentsSortBy.NAME_DESC : AppointmentsSortBy.NAME;
        currentSort === AppointmentsSortBy.NAME ?
          bookings.sort((a, b) => a.patientName.localeCompare(b.patientName)) :
          bookings.sort((a, b) => b.patientName.localeCompare(a.patientName));
        currentSort = sortBy;
        break;
      case AppointmentsSortBy.DOCTOR:
        sortBy = currentSort === AppointmentsSortBy.DOCTOR ? AppointmentsSortBy.DOCTOR_DESC : AppointmentsSortBy.DOCTOR;
        currentSort === AppointmentsSortBy.DOCTOR ?
          bookings.sort((a, b) => (a.doctor?.name as String).localeCompare(b.doctor?.name as string)) :
          bookings.sort((a, b) => (b.doctor?.name as String).localeCompare(a.doctor?.name as string));
        currentSort = sortBy;
        break;
      case AppointmentsSortBy.SESSION:
        sortBy = currentSort === AppointmentsSortBy.SESSION ? AppointmentsSortBy.SESSION_DESC : AppointmentsSortBy.SESSION;
        currentSort === AppointmentsSortBy.SESSION ?
          bookings.sort((a, b) => (a.sessionDate > b.sessionDate) ? 1 : ((b.sessionDate > a.sessionDate) ? -1 : 0)) :
          bookings.sort((a, b) => (b.sessionDate > a.sessionDate) ? 1 : ((a.sessionDate > b.sessionDate) ? -1 : 0));
        currentSort = sortBy;
        break;
      case AppointmentsSortBy.PATIENT_NO:
        sortBy = currentSort === AppointmentsSortBy.PATIENT_NO ? AppointmentsSortBy.PATIENT_NO_DESC : AppointmentsSortBy.PATIENT_NO;
        currentSort === AppointmentsSortBy.PATIENT_NO ?
          bookings.sort((a, b) => (a.patientNo > b.patientNo) ? 1 : ((b.patientNo > a.patientNo) ? -1 : 0)) :
          bookings.sort((a, b) => (b.patientNo > a.patientNo) ? 1 : ((a.patientNo > b.patientNo) ? -1 : 0));
        currentSort = sortBy;
        break;
      default:
        break;
    }
    return bookings;
  }

}
