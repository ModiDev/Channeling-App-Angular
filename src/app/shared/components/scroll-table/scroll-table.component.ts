import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {faCircle, faSort, faEdit, faCaretDown, faAngleDown, faBan, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentsViewComponent} from "../../modals/appointments-view/appointments-view.component";
import {Booking} from 'src/app/core/commons/models/Booking';
import {Session} from 'src/app/core/commons/models/Session';
import {BookingService} from 'src/app/core/services/booking/booking.service';
import {ngbModalOptions} from 'src/app/pages/home/home-page/home.component';
import {AddBookingModalComponent} from '../../modals/add-booking-modal/add-booking-modal.component';
import {AppointmentsSortBy, BookingStatus, PatientConfirmationType} from 'src/app/core/commons/constants/Constant';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {BookingCancelDTO} from 'src/app/core/commons/dtos/BookingCancelDTO';
import {NotificationService} from 'src/app/core/services/notification/notification.service';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BookingPatientConfirmationDTO} from 'src/app/core/commons/dtos/BookingPatientConfirmationDTO';

@Component({
  selector: 'app-scroll-table',
  templateUrl: './scroll-table.component.html',
  styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit, OnChanges {
  faBan = faBan;
  faEdit = faEdit;
  faSort = faSort;
  faCircle = faCircle;
  faDown = faCaretDown;
  sortIcon = faAngleDown;
  sortIconUp = faAngleUp;

  @Input() session!: Session;
  @Input() searchText!: string;
  @Input() statusFilter!: string;
  sessionId: string = "";
  searchString: string = "";
  statusFilterString: string = "";

  bookings: Booking[] = [];

  filterType: string = "";
  currentSort!: string;
  currentSortPipe!: string;
  sortBy: string = "";

  isHistoryPage: boolean = false;

  constructor(
    public modalService: NgbModal,
    private bookingService: BookingService,
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private router: Router,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isHistoryPage = event.url.includes("dashboard/history");
      }
    });
  }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.searchString = this.searchText;
    this.statusFilterString = this.statusFilter;
    this.sessionId = this.session?.id as string;
    if (this.sessionId !== "" && this.sessionId !== undefined) {
      this.bookingService.getBookingsBySessionId(this.sessionId).subscribe(
        (bookings) => {
          this.bookings = bookings as Booking[];
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  editBooking(booking: Booking) {
    const modalRef = this.modalService.open(AddBookingModalComponent, ngbModalOptions);
    if (booking.bookingStatus === BookingStatus.CONFIRMED) {
      modalRef.componentInstance.isConfirmEdit = true;
    }
    modalRef.componentInstance.booking = booking;
    modalRef.componentInstance.session = this.session;
    modalRef.componentInstance.isEdit = true;
  }

  cancelBooking(booking: Booking) {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class'
    }
    const modalRef = this.modalService.open(DialogBoxComponent, modalOptions);
    modalRef.componentInstance.description = " Cancelling appointment will move this patient no to available numbers";
    modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
      if ($e) {
        const cancelBooking: BookingCancelDTO = {
          bookingId: booking.id as string
        }
        this.bookingService.cancelBooking(cancelBooking).subscribe(
          (success) => {
            // this.activeModal.close();
            this.notifyService.showSuccess("Appointment cancelled successfully!", "Success");
          },
          (error) => {
            console.log(error);
            this.notifyService.showError("Cancelling appointment failed!", "Failure");
          }
        )
      }
    });
  }

  openAppointmentView(booking: Booking) {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class-booking-view'
    }

    const modalRef = this.modalService.open(AppointmentsViewComponent, modalOptions);
    modalRef.componentInstance.booking = booking;
    modalRef.componentInstance.session = this.session;
  }

  sortBookings(sortBy: string) {
    this.sortBy = sortBy;
    this.currentSortPipe = this.currentSort ?? sortBy;
    switch (sortBy) {
      case AppointmentsSortBy.REF_NO:
        this.currentSort = this.currentSort === AppointmentsSortBy.REF_NO ? AppointmentsSortBy.REF_NO_DESC : AppointmentsSortBy.REF_NO;
        break;
      case AppointmentsSortBy.NAME:
        this.currentSort = this.currentSort === AppointmentsSortBy.NAME ? AppointmentsSortBy.NAME_DESC : AppointmentsSortBy.NAME;
        break;
      case AppointmentsSortBy.DOCTOR:
        this.currentSort = this.currentSort === AppointmentsSortBy.DOCTOR ? AppointmentsSortBy.DOCTOR_DESC : AppointmentsSortBy.DOCTOR;
        break;
      case AppointmentsSortBy.SESSION:
        this.currentSort = this.currentSort === AppointmentsSortBy.SESSION ? AppointmentsSortBy.SESSION_DESC : AppointmentsSortBy.SESSION;
        break;
      case AppointmentsSortBy.PATIENT_NO:
        this.currentSort = this.currentSort === AppointmentsSortBy.PATIENT_NO ? AppointmentsSortBy.PATIENT_NO_DESC : AppointmentsSortBy.PATIENT_NO;
        break;
      default:
        break;
    }
  }

  getPatientConfirmationTypesList(): string[] {
    return Object.values(PatientConfirmationType);
  }

  updatePatientConfirmationType(type: string, booking: Booking) {
    if (this.bookings.find((value) => value.id === booking.id)?.patientConfirmation !== type) {
      const dto: BookingPatientConfirmationDTO = {
        bookingId: booking.id as string,
        type: type,
      }
      this.bookingService.updatePatientConfirmation(dto).subscribe(
        (value) => {
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
