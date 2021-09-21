import {LocalStorageService} from "./../../../core/services/local-storage/local-storage.service";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subscription, timer} from "rxjs";
import {map, share} from "rxjs/operators";
import {SessionService} from "src/app/core/services/session/session.service";
import {SessionStatus} from "src/app/core/commons/constants/Constant";
import {Session} from "src/app/core/commons/models/Session";
import {AddSessionPopupComponent} from "src/app/shared/modals/add-session-popup/add-session-popup.component";
import {AppointmentsViewComponent} from "src/app/shared/modals/appointments-view/appointments-view.component";

export const ngbModalOptions: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false,
  centered: true,
  windowClass: 'my-class-booking-view'
};

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  faAngleRight = faAngleDoubleRight;
  faAngleLeft = faAngleDoubleLeft;

  date = new Date();
  time = new Date();
  timeSubscription: Subscription = new Subscription();

  sessionList: Session[] = [];
  sessionListSubscription: Subscription = new Subscription();

  searchText: string = "";

  isActiveSessionsOverflowed: boolean = false;

  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.date.setHours(23, 59, 59, 0);

    this.timeSubscription = timer(0, 60000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.time = time;
      });

    this.sessionListSubscription = this.sessionService
      .getTodaySessions()
      .subscribe((sessions) => {
        this.sessionList = sessions as Session[];
        this.isActiveSessionsOverflowed =
          this.title.nativeElement.scrollWidth >
          this.title.nativeElement.clientWidth;
      });
  }

  getUpcomingSessions() {
    return this.sessionList.filter(
      (session) =>
        session.startsAt > this.time &&
        session.doctor?.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) &&
        session.status !== SessionStatus.ENDED
    );
  }

  getActiveSessions() {
    return this.sessionList.filter(
      (session) =>
        session.startsAt < this.time &&
        this.time < this.date &&
        session.doctor?.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) &&
        session.status !== SessionStatus.ENDED
    );
  }

  openAddSession() {
    this.modalService.open(AddSessionPopupComponent, ngbModalOptions);
  }

  ngOnDestroy(): void {
    if (this.sessionListSubscription)
      this.sessionListSubscription.unsubscribe();
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
  }

  searchSession(searchPrase: any) {
    this.searchText = searchPrase;
  }

  showLastReciept() {
    const lastReceipt = this.localStorageService.getLastRecipt();
    if (lastReceipt) {
      const modalRef = this.modalService.open(AppointmentsViewComponent, ngbModalOptions);
      modalRef.componentInstance.booking = lastReceipt.booking;
      modalRef.componentInstance.session = lastReceipt.session;
      // modalRef.componentInstance.fillDataToPrintTemplate();
    } else {

    }
  }

  @ViewChild("activeSessions")
  title!: ElementRef;
}
