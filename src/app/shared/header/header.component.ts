
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faSortDown, faUserCircle, faMoneyBill, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {DoctorService} from 'src/app/core/services/doctor/doctor.service';
import {UserService} from 'src/app/core/services/user/user.service';
import {UserFirestore} from 'src/app/core/commons/models/UserFirestore';
import {ngbModalOptions} from 'src/app/pages/home/home-page/home.component';
import {LogoutViewModalComponent} from '../modals/logout-view-modal/logout-view-modal.component';
import {PaymentsFormModalComponent} from '../modals/payments-form-modal/payments-form-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //  FontAwesome Icons
  faBars = faBars;
  faUser = faUserCircle;
  faSortDown = faSortDown;
  faMoneyBill = faMoneyBill;
  faSignOut = faSignOutAlt;

  user!: UserFirestore;

  @Output() toggleSideBarEvent = new EventEmitter<boolean>();
  toggleButton: boolean = true;

  doctorId: string = ""
  constructor(
    private auth: AuthService,
    private doctorService: DoctorService,
    private modalService: NgbModal,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.doctorService.getDoctorForHistoryRoute().subscribe(
      (doctor) => this.doctorId = doctor?.id as string
    )
    this.auth.getCurrentUser().then((user) => {
      this.userService.getUserByUid(user?.uid as string).subscribe((userFirestore) => {
        this.user = userFirestore;
      })
    })
  }

  signOut() {
    // this.modalService.open(CashBalanceModalComponent,{centered:true})
    // this.auth
    //   .signOut()
    //   .catch((error) => {
    //   });
  }

  toggleSideBar(value: boolean) {
    this.toggleSideBarEvent.emit(value);
    this.toggleButton = value;
  }

  openLogoutView() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: "log-out-model",
    }
    const modalRef = this.modalService.open(LogoutViewModalComponent, modalOptions);
    modalRef.componentInstance.user = this.user;
  }

  openPaymentsView() {
    const modalRef = this.modalService.open(PaymentsFormModalComponent, ngbModalOptions);
    modalRef.componentInstance.user = this.user;
  }
}
