import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {faAngleDoubleLeft, faAngleDoubleRight, faEdit, faEllipsisV, faPlus, faSortDown} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {DoctorService} from 'src/app/core/services/doctor/doctor.service';
import {SessionService} from 'src/app/core/services/session/session.service';
import {Doctor} from 'src/app/core/commons/models/Doctor';
import {Session} from 'src/app/core/commons/models/Session';
import {NotificationService} from "../../../core/services/notification/notification.service";
import {SessionStatus} from 'src/app/core/commons/constants/Constant';
import {AddSessionPopupComponent} from 'src/app/shared/modals/add-session-popup/add-session-popup.component';
import {ngbModalOptions} from '../home-page/home.component';
import {DialogBoxComponent} from 'src/app/shared/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss']
})
export class DoctorPageComponent implements OnInit {
  faAngleRight = faAngleDoubleRight;
  faAngleLeft = faAngleDoubleLeft;
  faplus = faPlus;
  faEdit = faEdit;
  faEllipsis = faEllipsisV;
  faSortDown = faSortDown;

  date = new Date();
  searchText: string = "";
  statusFilter: string = "";

  selectedSession!: Session;
  sessionList: Session[] = [];
  activeSessions: Session[] = [];
  sessionListSubscription: Subscription = new Subscription;

  isSessionsListOverflowed: boolean = false;

  globallySelectedSessionId: string = "";

  doctor!: Doctor;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private doctorService: DoctorService,
    private notifyService: NotificationService,
    private modalService: NgbModal
  ) {
    this.route.params.subscribe(
      params => {
        this.doctorService.getSingleDoctor(params['id']).get().subscribe(
          (value) => this.doctor = value.data() as Doctor,
        );
        this.sessionListSubscription = this.sessionService
          .getUpcomingSessionsByDoctorId(params['id'])
          .subscribe((sessions) => {
            this.sessionList = sessions as Session[];
            const selectedSessionId = params['sessionId'];
            if (selectedSessionId) {
              const [ss] = this.sessionList.filter(s => s.id === selectedSessionId);
              this.setGloballySelectedSession(ss);
            }

            this.setScrollButtonDisable();
            setTimeout(() => {this.setScrollButtonDisable()}, 1);
          });
      }
    )
  }

  ngOnInit(): void {
    this.date.setHours(0, 0, 0, 0);
  }

  getUpcomingSessions() {
    return this.sessionList.filter((session) => session.status !== SessionStatus.ENDED);
  }

  openAddSession() {
    this.modalService.open(AddSessionPopupComponent, ngbModalOptions);
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

  ngOnDestroy(): void {
    this.sessionListSubscription.unsubscribe();
  }

  openEditSession() {
    if (this.selectedSession !== undefined) {
      const modalRef = this.modalService.open(AddSessionPopupComponent, ngbModalOptions);
      modalRef.componentInstance.session = this.selectedSession;
    }
  }

  @ViewChild('activeSessions')
  sessionElement!: ElementRef;

  setScrollButtonDisable() {
    this.isSessionsListOverflowed = this.sessionElement.nativeElement.scrollWidth > this.sessionElement.nativeElement.clientWidth;
  }

  setGloballySelectedSession(value: Session) {
    this.globallySelectedSessionId = value.id as string;
    this.selectedSession = value;
  }

}
