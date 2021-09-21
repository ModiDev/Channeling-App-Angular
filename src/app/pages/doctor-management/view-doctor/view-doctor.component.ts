import {Component, Input, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {DoctorService} from "../../../core/services/doctor/doctor.service";
import {UpdateDoctorStatusDTO} from "../../../core/commons/dtos/UpdateDoctorStatusDTO";
import {ActiveStatus, SessionStatus} from "../../../core/commons/constants/Constant";
import {NotificationService} from "../../../core/services/notification/notification.service";
import {Doctor} from 'src/app/core/commons/models/Doctor';
import {AddDoctorFormComponent} from '../add-doctor-form/add-doctor-form.component';
import {DialogBoxComponent} from "../../../shared/components/dialog-box/dialog-box.component";
import {NgxSpinnerService} from "ngx-spinner";
import {Session} from "../../../core/commons/models/Session";
import {SessionService} from "../../../core/services/session/session.service";
import {AlertDialogBoxComponent} from "../../../shared/components/alert-dialog-box/alert-dialog-box.component";
import {ngbModalOptions} from '../../home/home-page/home.component';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss']
})
export class ViewDoctorComponent implements OnInit {
  faCross = faTimes;
  faEdit = faEdit;
  activeStatusActive = ActiveStatus.ACTIVE

  @Input() doctor!: Doctor;
  @Input() session?: Session;

  constructor(
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private doctorService: DoctorService,
    private modalService: NgbModal,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService) {
  }

  buttonInactive: string = "MOVE TO INACTIVE";
  buttonActive: string = "MOVE TO ACTIVE";
  buttonSessions: string = "DOCTOR HISTORY";

  updateDoctorActiveStatus() {
    this.spinner.show();
    const doctorUpdateStatusDTO: UpdateDoctorStatusDTO = {
      id: this.doctor.id || "",
      status: this.doctor.status === ActiveStatus.ACTIVE ? ActiveStatus.DE_ACTIVE : ActiveStatus.ACTIVE
    }

    this.doctorService.updateDoctorStatus(doctorUpdateStatusDTO)
      .subscribe((val) => {
        this.spinner.hide();
        this.notifyService.showSuccess("Doctor status updated successfully!", "Success");
        this.activeModal.close();
      },
        (error) => {
          this.spinner.hide();
          if (this.doctor.status == ActiveStatus.ACTIVE && error.code === 'failed-precondition') {
            const modalRef = this.modalService.open(AlertDialogBoxComponent, {centered: true, windowClass: 'my-class-alert'});
            modalRef.componentInstance.alertTitle = "CAN'T INACTIVATE";
            modalRef.componentInstance.alertDescription = this.doctor.title + " " + this.doctor.name + " has upcoming sessions or active sessions.";
          } else {
            this.notifyService.showError("Doctor status update failed!", "Failure");
          }
        });
  }

  ngOnInit(): void {
  }

  inactiveDoctor() {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class',
    }
    const modalRef = this.modalService.open(DialogBoxComponent, modalOptions);

    if (this.doctor.status == ActiveStatus.ACTIVE) {
      modalRef.componentInstance.description = "This will Inactivate the doctor and it will stop adding \n" +
        "sessions for the doctor";
    }
    else if (this.doctor.status == ActiveStatus.DE_ACTIVE) {
      modalRef.componentInstance.description = "This will Activate the doctor and it will continue adding \n" +
        "sessions for the doctor";
    }

    modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
      if ($e) {
        this.updateDoctorActiveStatus();
      }
    });
  }

  showDoctorEditModel() {
    const updateDoctorModelRef = this.modalService.open(AddDoctorFormComponent, ngbModalOptions)
    updateDoctorModelRef.componentInstance.doctor = this.doctor;
    this.activeModal.dismiss();
  }
}
