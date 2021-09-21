import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Booking} from 'src/app/core/commons/models/Booking';
import {AppointmentsSortBy} from 'src/app/core/commons/constants/Constant';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./appointments-table.component.scss']
})
export class AppointmentsTableComponent implements OnInit {

  sortIcon = faAngleDown;
  sortIconUp = faAngleUp;

  currentSort!: AppointmentsSortBy;
  previousSort!: AppointmentsSortBy;

  @Input() bookings!: Booking[];
  @Input() searchText!: string;
  @Output() onSortByChange = new EventEmitter<AppointmentsSortBy>();
  constructor() { }

  ngOnInit(): void {
  }

  sortBookings(sortBy: string) {
    switch (sortBy) {
      case AppointmentsSortBy.REF_NO:
        this.currentSort = this.previousSort === AppointmentsSortBy.REF_NO ? AppointmentsSortBy.REF_NO_DESC : AppointmentsSortBy.REF_NO;
        break;
      case AppointmentsSortBy.NAME:
        this.currentSort = this.previousSort === AppointmentsSortBy.NAME ? AppointmentsSortBy.NAME_DESC : AppointmentsSortBy.NAME;
        break;
      case AppointmentsSortBy.DOCTOR:
        this.currentSort = this.previousSort === AppointmentsSortBy.DOCTOR ? AppointmentsSortBy.DOCTOR_DESC : AppointmentsSortBy.DOCTOR;
        break;
      case AppointmentsSortBy.SESSION:
        this.currentSort = this.previousSort === AppointmentsSortBy.SESSION ? AppointmentsSortBy.SESSION_DESC : AppointmentsSortBy.SESSION;
        break;
      case AppointmentsSortBy.PATIENT_NO:
        this.currentSort = this.previousSort === AppointmentsSortBy.PATIENT_NO ? AppointmentsSortBy.PATIENT_NO_DESC : AppointmentsSortBy.PATIENT_NO;
        break;
      default:
        break;
    }
    this.previousSort = this.currentSort;
    this.onSortByChange.emit(this.currentSort);
  }
}
