import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faEdit, faEllipsisV, faPlus, faSearch, faSortDown} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {BookingService} from 'src/app/core/services/booking/booking.service';
import {DoctorService} from 'src/app/core/services/doctor/doctor.service';
import {SessionService} from 'src/app/core/services/session/session.service';
import {Booking} from 'src/app/core/commons/models/Booking';
import {Doctor} from 'src/app/core/commons/models/Doctor';
import {Session} from 'src/app/core/commons/models/Session';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.scss']
})
export class SessionHistoryComponent implements OnInit {
  faBack = faAngleLeft;
  searchIcon = faSearch;
  faAngleRight = faAngleDoubleRight;
  faAngleLeft = faAngleDoubleLeft;
  faplus = faPlus;
  faEdit = faEdit;
  faEllipsis = faEllipsisV;
  faSortDown = faSortDown;

  date = new Date();

  sessionList: Session[] = [];
  sessionListSubscription: Subscription = new Subscription;

  bookings: Booking[] = [];
  bookingsSubscription: Subscription = new Subscription;

  searchText: string = "";
  searchTextBooking: string = "";
  statusFilter: string = "";
  inputText: string = "";

  doctor!: Doctor;
  selectedSession!: Session;
  globallySelectedSessionId: string = "";

  isActiveSessionsOverflowed: boolean = false;
  isSearchPage: boolean = false;

  dateSearchForm!: FormGroup;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
  ) {
    this.route.params.subscribe(
      params => {
        this.doctorService.getSingleDoctor(params['id']).get().subscribe(
          (value) => {
            this.doctor = value.data() as Doctor;
            this.sessionListSubscription = this.sessionService
              .getSessionHistoryByDoctorId(params['id'])
              .subscribe((sessions) => {
                this.sessionList = sessions as Session[];
                this.setScrollButtonDisable();
              });
          }
        )
      }
    );
  }

  ngOnInit(): void {
    this.bookingsSubscription = this.bookingService.getBookingHistory().subscribe(
      (bookings) => {
        this.bookings = bookings as Booking[];
      }
    );

    this.dateSearchForm = this.formBuilder.group({
      date: new FormControl("", [])
    })

    this.dateSearchForm.get('date')?.valueChanges.subscribe(
      (value) => {
        this.date = new Date(value);
        this.date.setHours(0, 0, 0, 0);
        this.setScrollButtonDisable();
      }
    )
  }

  getSessions() {
    return this.date.toDateString() !== new Date().toDateString() ?
      this.sessionList.filter((val) =>
        val.sessionDate.toDateString() === this.date.toDateString()
      ) : this.sessionList;
  }

  ngOnDestroy(): void {
    if (this.sessionListSubscription)
      this.sessionListSubscription.unsubscribe();
  }

  onChangeSearchText(value: any) {
    this.searchText = value;
  }

  @ViewChild('activeSessions')
  sessionElement!: ElementRef;

  globallySelectedSession(value: Session) {
    this.globallySelectedSessionId = value.id as string;
    this.selectedSession = value;
  }

  goBack() {
    this.isSearchPage = false;
    this.searchText = "";
  }

  setScrollButtonDisable() {
    setTimeout(() => {
      this.isActiveSessionsOverflowed = this.sessionElement.nativeElement.scrollWidth > this.sessionElement.nativeElement.clientWidth;
    }, 0);
  }

}
