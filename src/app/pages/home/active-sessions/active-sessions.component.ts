import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faEllipsisV,
  faPlus,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import {Session} from "../../../core/commons/models/Session";
import {Subscription, timer} from "rxjs";
import {SessionService} from "../../../core/services/session/session.service";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {map, share} from "rxjs/operators";
import {NotificationService} from "../../../core/services/notification/notification.service";
import {SessionStatus} from 'src/app/core/commons/constants/Constant';
import {Booking} from "../../../core/commons/models/Booking";
import {BookingService} from "../../../core/services/booking/booking.service";
import {AddSessionPopupComponent} from "../../../shared/modals/add-session-popup/add-session-popup.component";
import {LogsViewModalComponent} from 'src/app/shared/modals/logs-view-modal/logs-view-modal.component';
import {ngbModalOptions} from '../home-page/home.component';
import {DialogBoxComponent} from 'src/app/shared/components/dialog-box/dialog-box.component';


@Component({
  selector: 'app-active-sessions',
  templateUrl: './active-sessions.component.html',
  styleUrls: ['./active-sessions.component.scss']
})
export class ActiveSessionsComponent implements OnInit {
  faAngleRight = faAngleDoubleRight;
  faAngleLeft = faAngleDoubleLeft;
  faplus = faPlus;
  faEdit = faEdit;
  faEllipsis = faEllipsisV;
  faSortDown = faSortDown;

  date = new Date();
  time = new Date();

  searchText: string = "";
  statusFilter: string = "";
  session!: Session;
  booking!: Booking;

  selectedSession!: Session;
  sessionList: Session[] = [];
  sessionListSubscription: Subscription = new Subscription;
  timeSubscription: Subscription = new Subscription;

  isActiveSessionsOverflowed: boolean = false;

  globallySelectedSessionId: string = "";

  constructor(
    private sessionService: SessionService,
    private bookingService: BookingService,
    private notifyService: NotificationService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {

    this.date.setHours(23, 59, 59, 0);

    this.timeSubscription = timer(0, 60000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.time = time;
      });

    this.sessionListSubscription = this.sessionService
      .getTodaySessions()
      .subscribe((sessions) => {
        this.sessionList = sessions as Session[];
        this.isActiveSessionsOverflowed = this.title.nativeElement.scrollWidth > this.title.nativeElement.clientWidth;
      });
  }

  ngOnDestroy(): void {
    if (this.sessionListSubscription)
      this.sessionListSubscription.unsubscribe();
    if (this.timeSubscription)
      this.timeSubscription.unsubscribe();
  }

  getActiveSessions() {
    return this.sessionList
      .filter(session =>
        session.startsAt < this.time && this.time < this.date &&
        session.status !== SessionStatus.ENDED
      );
  }

  endSession() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class'
    }
    const modalRef = this.modalService.open(DialogBoxComponent, modalOptions);
    modalRef.componentInstance.description = "Ending session will stop the current session and only give access to view the session ";
    modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
      if ($e) {
        if (this.selectedSession && this.selectedSession.id) {
          this.sessionService
            .endSession(this.selectedSession.id)
            .subscribe((val) => {
              this.notifyService.showSuccess("Session ended successfully!", "Success");
            },
              (error) => {
                this.notifyService.showError("Session end failed!", "Failure");
              });
        } else {
          this.notifyService.showError("Session end failed!", "Failure");
        }
      }
    });
  }

  openEditSession() {
    if (this.selectedSession !== undefined) {
      const modalRef = this.modalService.open(AddSessionPopupComponent, ngbModalOptions);
      modalRef.componentInstance.session = this.selectedSession;
    }
  }

  @ViewChild('activeSessions')
  title!: ElementRef;

  globallySelectedSession(value: Session) {
    this.globallySelectedSessionId = value.id as string;
    this.selectedSession = value;
  }

  openSessionLogs() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      size: 'lg',
    }
    if (this.selectedSession !== undefined) {
      const modalRef = this.modalService.open(LogsViewModalComponent, modalOptions);
      modalRef.componentInstance.session = this.selectedSession;
    }
  }
}
