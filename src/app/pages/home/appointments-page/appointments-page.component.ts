import {faAngleDown, faAngleLeft, faAngleRight, faHome, } from "@fortawesome/free-solid-svg-icons";
import {Booking} from "src/app/core/commons/models/Booking";
import {Component, OnInit} from "@angular/core";
import {ActiveStatus, AppointmentsSortBy} from "src/app/core/commons/constants/Constant";
import {BookingService} from "src/app/core/services/booking/booking.service";
import {NgxSpinnerService} from "ngx-spinner";

interface ARes {
  appointments: Booking[];
  pageNumber: number;
  itemCountPerPage: number;
}

@Component({
  selector: "app-appointments-page",
  templateUrl: "./appointments-page.component.html",
  styleUrls: ["./appointments-page.component.scss"],
})
export class AppointmentsPageComponent implements OnInit {
  sortIcon = faAngleDown;
  IconPrevious = faAngleLeft;
  IconNext = faAngleRight;
  IconHome = faHome;

  searchText: string = "";
  searchType: ActiveStatus | "all" = "all";
  sortBy!: AppointmentsSortBy;
  isSortBy: boolean = false;
  pageNumber: number = 1;

  isLoading: boolean = true;

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.search();
  }

  onChangeSearchText(value: any) {
    this.searchText = value;

    if (this.searchText.length === 0) {
      this.search();
    }
    else {
      this.isSortBy = false;
    }

  }

  onChangeSearchType(value: any) {
    this.searchType = value;
  }

  onActionClick() {
  }

  onNext() {
    if (this.bookings.length != 0) {
      this.pageNumber++;
      this.search();
    }
  }

  onPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.search();
    }
  }

  onHomeClick() {
    if (this.pageNumber != 1) {
      this.pageNumber = 1;
      this.search();
    }
  }

  onSortByChange(value: AppointmentsSortBy) {
    this.sortBy = value;
    if (value.trim().length > 0 && this.searchText.trim().length === 0) {
      this.isSortBy = true;
      this.onSearch();
    }
  }

  onSearch() {
    this.pageNumber = 1
    this.search();
  }

  search() {
    this.spinner.show();
    this.isLoading = true;
    this.bookingService
      .getBookings(this.isSortBy ? {
        itemCountPerPage: 15,
        pageNumber: this.pageNumber,
        searchText: "",
        orderBy: this.sortBy,
      } : {
        itemCountPerPage: 15,
        pageNumber: this.pageNumber,
        searchText: this.searchText,
      })
      .subscribe((bookings: ARes) => {
        this.isLoading = false;
        this.spinner.hide();
        this.bookings = bookings.appointments.map((a) => {
          const date = new Date((a.sessionDate as any)._seconds * 1000);
          const start = new Date((a.sessionStartsAt as any)._seconds * 1000);
          const end = new Date((a.sessionEndsAt as any)._seconds * 1000);
          return {...a, sessionStartsAt: start, sessionDate: date, sessionEndsAt: end};
        });
      }, error => {
        this.isLoading = false;
        this.spinner.hide();
      });
  }
}
