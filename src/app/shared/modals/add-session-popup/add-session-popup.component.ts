import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  faCalendar,
  faClock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SessionService } from "src/app/core/services/session/session.service";
import { Subscription } from "rxjs";
import { Doctor } from "src/app/core/commons/models/Doctor";
import { DoctorService } from "src/app/core/services/doctor/doctor.service";
import { Session } from "src/app/core/commons/models/Session";
import { SessionStatus } from "src/app/core/commons/constants/Constant";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { CreateSessionDTO } from "src/app/core/commons/dtos/CreateSessionDTO";
import { NotificationService } from "src/app/core/services/notification/notification.service";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs/operators";
@Component({
  selector: "app-add-session-popup",
  templateUrl: "./add-session-popup.component.html",
  styleUrls: ["./add-session-popup.component.scss"],
})
export class AddSessionPopupComponent implements OnInit {
  error: string = "";

  submitButtonTitle: string = "CONFIRM";

  modalTitle: string = "ADD SESSION";

  faCross = faTimes;
  faDatePicker = faCalendar;
  faTimePicker = faClock;

  doctorListSubscription: Subscription = new Subscription();
  doctorList: Doctor[] = [];
  selectedDoctor: Doctor = <Doctor>{};

  session!: Session;

  isUpdate: boolean = false;
  isBusy: boolean = false;

  addSessionForm!: FormGroup;

  constructor(
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.doctorListSubscription = this.doctorService
      .getActiveDoctors()
      .subscribe((action) => {
        const docts = action.map((dc) => {
          return {
            ...(dc.payload.doc.data() as Doctor),
            id: dc.payload.doc.id,
          };
        });
        this.doctorList = docts;
      });

    this.addSessionForm = this.formBuilder.group({
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, []),
      patientLimit: new FormControl(null, []),
      reservedLimit: new FormControl(null, [
        Validators.max(5),
        Validators.min(1),
      ]),
    });
    if (this.session != undefined || this.session != null) {
      this.isUpdate = true;
      this.modalTitle = "UPDATE SESSION";
      this.submitButtonTitle = "UPDATE";
      this.addSessionForm.setValue(
        {
          doctor: this.session?.doctorId,
          date: formatDate(this.session?.sessionDate, 'yyyy-MM-dd', 'en_US'),
          startTime: this.session.startsAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute:
              '2-digit', hour12: true
          }),
          endTime: this.session.endsAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute:
              '2-digit', hour12: true
          }),
          patientLimit: this.session.sessionLimit,
          reservedLimit: this.session.reservedLimit,
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.doctorListSubscription.unsubscribe();
  }
  addTimeToDate(time: string, dateString: string) {
    let date = new Date(dateString);
    let parts = time.match(/(\d+):(\d+) (AM|PM|am|pm)/);
    if (parts) {
      let hours = parseInt(parts[1]),
        minutes = parseInt(parts[2]),
        tt = parts[3];
      if ((tt === "PM" || tt === "pm") && hours < 12) hours += 12;
      if ((tt === "AM" || tt === "am") && hours === 12) hours = 0;
      date.setHours(hours, minutes, 0, 0);
      return date;
    }

    return date;
  }

  onSubmit() {
    this.spinner.show();
    this.selectedDoctor = this.doctorList.find(
      (doctor) => doctor.id === this.addSessionForm.get("doctor")?.value
    ) as Doctor;
    if (this.addSessionForm.valid && !this.isBusy) {
      this.isBusy = true;
      let reservedLimit = [];
      for (
        let index = 0;
        index < Number(this.addSessionForm.get("reservedLimit")?.value || 0);
        index++
      ) {
        reservedLimit.push(index + 1);
      }
      const sessionDate = new Date(this.addSessionForm.get("date")?.value);
      sessionDate.setHours(0, 0, 0, 0);
      const newSession: CreateSessionDTO = {
        startsAt: this.addTimeToDate(this.addSessionForm.get("startTime")?.value, sessionDate.toString(),).toString(),
        endsAt: this.addTimeToDate(this.addSessionForm.get("endTime")?.value
          ? this.addSessionForm.get("endTime")?.value : "11:59 PM", sessionDate.toString(),).toString(),
        sessionDate: sessionDate.toString(),
        status: SessionStatus.PENDING,
        doctorId: this.selectedDoctor.id,
        sessionMisc: 0,
        sessionLimit: Number(
          this.addSessionForm.get("patientLimit")?.value ?? 0
        ),
        bookingCount: 0,
        limit_not_exceeded: true,
        currentNumber: 0,
        delayTime: 0,
        doctor: this.selectedDoctor,
        reservedLimit: Number(
          this.addSessionForm.get("reservedLimit")?.value ?? 0
        ),
        availableNumbers: reservedLimit,
        services: this.selectedDoctor.services ?? [],
      };
      if (this.isUpdate) {
        try {
          this.sessionService
            .updateSession({
              ...newSession,
              id: this.session.id as string,
              startsAt: newSession.startsAt.toString(),
              endsAt: newSession.endsAt.toString(),
              sessionDate: newSession.sessionDate.toString(),
            })
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe(
              (success) => {
                this.activeModal.dismiss("from-confirm");
                this.isBusy = false;
                this.notifyService.showSuccess(
                  "Session updated successfully!", "Success");
              },
              (error) => {
                console.log(error);
                this.isBusy = false;

                if (error.code === "already-exists") {
                  this.notifyService.showError("Session time occupied!", "Failure");
                } else {
                  this.notifyService.showError("Session update failed!", "Failure");
                }
              }
            );
        } catch (error) {
          this.error = error.error;
          this.isBusy = false;
        }
      } else {
        try {
          this.sessionService.addSession(newSession).pipe(finalize(() => this.spinner.hide())).subscribe(
            (val) => {
              this.activeModal.dismiss('from-confirm');
              this.isBusy = false;
              this.notifyService.showSuccess("Session added successfully!", "Success");
            },
            (error) => {
              this.error = error;
              this.isBusy = false;

              if (error.code === "already-exists") {
                this.notifyService.showError("Session time occupied!", "Failure");
              } else {
                this.notifyService.showError("Session adding failed!", "Failure");
              }
            });
        } catch (error) {
          this.error = error.message;
          this.isBusy = false;
        }
      }
    }
  }
}
