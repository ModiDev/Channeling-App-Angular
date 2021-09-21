import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable, Subject} from 'rxjs';
import {BookingService} from 'src/app/core/services/booking/booking.service';
import {DoctorService} from 'src/app/core/services/doctor/doctor.service';
import {NotificationService} from 'src/app/core/services/notification/notification.service';
import {PaymentService} from 'src/app/core/services/payment/payment.service';
import {PrintingService} from 'src/app/core/services/printing/printing.service';
import {SessionService} from 'src/app/core/services/session/session.service';
import {UserService} from 'src/app/core/services/user/user.service';
import {DoctorPaymentDTO} from 'src/app/core/commons/dtos/DoctorPaymentDTO';
import {DrawerTransferDTO} from 'src/app/core/commons/dtos/DrawerTransferDTO';
import {OtherPaymentDTO} from 'src/app/core/commons/dtos/OtherPaymentDTO';
import {BookingPayment} from 'src/app/core/commons/models/BookingPayment';
import {Doctor} from 'src/app/core/commons/models/Doctor';
import {Session} from 'src/app/core/commons/models/Session';
import {UserFirestore} from 'src/app/core/commons/models/UserFirestore';
import {ngbModalOptions} from 'src/app/pages/home/home-page/home.component';
import {DialogBoxComponent} from '../../components/dialog-box/dialog-box.component';
import {DoctorPaymentTemplateData} from '../../print-templates/doctor-payment-template/doctor-payment-template.component';

export enum PaymentType {
  SHARE_MONEY_TO_CASHIER = "Share money to cashier",
  PAY_TO_DOCTOR = "Pay to doctor",
  PETTY_CASH_PAYMENT = "Petty cash payment",
}

@Component({
  selector: 'app-payments-form-modal',
  templateUrl: './payments-form-modal.component.html',
  styleUrls: ['./payments-form-modal.component.scss']
})
export class PaymentsFormModalComponent implements OnInit {
  faTimes = faTimes;

  error: string = "";
  paymentForm!: FormGroup;
  paymentTypes!: string[];

  user!: UserFirestore;
  cashiers: UserFirestore[] = [];
  doctors: Doctor[] = [];
  sessions: Session[] = [];
  bookingPayments: BookingPayment[] = [];

  selectedSession!: Session;
  selectedDoctor!: Doctor;
  doctorPaymentData!: DoctorPaymentTemplateData;
  totalDoctorPayment: number = 0;

  isFirstPage: boolean = true;
  isBusy: boolean = false;
  isSessionsLoading: boolean = true;

  constructor(
    private paymentService: PaymentService,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private doctorService: DoctorService,
    private sessionService: SessionService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private notifyService: NotificationService,
    private printService: PrintingService,
  ) { }

  ngOnInit(): void {
    this.paymentTypes = Object.values(PaymentType);
    this.paymentForm = this.formBuilder.group({
      paymentType: new FormControl(PaymentType.SHARE_MONEY_TO_CASHIER, [Validators.required]),
      drawerTransfer: new FormGroup({
        cashierName: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),
        description: new FormControl("", [])
      }),
      doctorPayment: new FormGroup({
        doctorName: new FormControl("", [Validators.required]),
        sessionId: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      }),
      otherPayment: new FormGroup({
        description: new FormControl("", [Validators.required]),
        paymentAmount: new FormControl("", [Validators.required]),
      }),
    });

    this.userService.getUserCollection().subscribe(
      (snapshot) => {
        this.cashiers = snapshot.docs.map(
          (value) => value.data() as UserFirestore,
        ).filter((user) => user.uid !== this.user?.uid);
      }
    );

    this.doctorService.getActiveDoctors().subscribe(
      (snapshot) => {
        this.doctors = snapshot.map((a) => {
          return {
            ...a.payload.doc.data() as Doctor,
            id: a.payload.doc.id,
          }
        });
      }
    );

    this.paymentForm.get(['doctorPayment', 'doctorName'])?.valueChanges.subscribe(
      (value) => {
        this.selectedDoctor = this.doctors.find((doctor) => doctor.id === value) as Doctor;
        this.isSessionsLoading = true;
        this.sessionService.getSessionHistoryByDoctorId(value).subscribe(
          (snapshot) => {
            this.sessions = snapshot as Session[];
            this.isSessionsLoading = false;
          }
        )
      }
    );

    this.paymentForm.get(['doctorPayment', 'sessionId'])?.valueChanges.subscribe(
      (value) => {
        this.selectedSession = this.sessions.find((session) => session.id === value) as Session;
        this.bookingService.getBookingPaymentsBySessionId(value).subscribe(
          (snapshot) => {
            this.bookingPayments = snapshot as BookingPayment[];
            this.bookingPayments.forEach((payment) => {
              this.totalDoctorPayment += payment.totalDoctorPayment;
            });
          }
        )
      }
    );
  }

  confirmPayment(description: string): Observable<boolean> {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'my-class'
    }
    let subject = new Subject<boolean>();
    const modalRef = this.modalService.open(DialogBoxComponent, modalOptions);
    modalRef.componentInstance.title = " Transfer Money? ";
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.onPressEvent.subscribe(($e: boolean) => {
      subject.next($e);
    });
    return subject.asObservable();
  }


  showNotification(isError: boolean, res: any = "") {
    if (isError) {
      this.notifyService.showError("Payment transfer failed!", "Failure");
    }
    else {
      this.notifyService.showSuccess("Payment transferred successfully!", "Success");
    }
  }

  completeTransaction(isError: boolean, response: any = "") {
    this.isBusy = false;
    this.spinner.hide();
    this.showNotification(isError);
    if (!isError)
      this.activeModal.close();
  }

  printPayment() {
    let element = document.getElementById("doctor-payment-section");
    this.printService.print(element);
  }

  onConfirm() {
    if (this.paymentForm.get("paymentType")?.value === PaymentType.SHARE_MONEY_TO_CASHIER && !this.isBusy) {
      const cashierName = this.cashiers.find((user) => user.uid === this.paymentForm.get(['drawerTransfer', 'cashierName'])?.value)?.displayName;
      const amount = this.paymentForm.get(['drawerTransfer', 'amount'])?.value;
      this.confirmPayment(`Do you want to share Rs.${amount} to ${cashierName}.`).subscribe(
        (choice) => {
          if (choice) {
            this.isBusy = true;
            this.spinner.show();
            const drawerTransferDTO: DrawerTransferDTO = {
              TransferToUserId: this.paymentForm.get(['drawerTransfer', 'cashierName'])?.value,
              transferAmount: Number(this.paymentForm.get(['drawerTransfer', 'amount'])?.value),
              description: this.paymentForm.get(['drawerTransfer', 'description'])?.value ?? "",
            }

            this.paymentService.drawerTransfer(drawerTransferDTO).subscribe(
              (res) => {
                this.completeTransaction(false);
              },
              (error) => {
                console.log(error);
                this.completeTransaction(true, error);
              }
            )
          }
        }
      );
    }
    else if (this.paymentForm.get("paymentType")?.value === PaymentType.PETTY_CASH_PAYMENT && !this.isBusy) {
      const amount = this.paymentForm.get(['otherPayment', 'paymentAmount'])?.value;
      const reason = this.paymentForm.get(['otherPayment', 'description'])?.value;
      this.confirmPayment(`Do you want to share Rs.${amount} for ${reason}.`).subscribe(
        (choice) => {
          if (choice) {
            this.isBusy = true;
            this.spinner.show();
            const otherPayment: OtherPaymentDTO = {
              description: this.paymentForm.get(['otherPayment', 'description'])?.value,
              paymentAmount: Number(this.paymentForm.get(['otherPayment', 'paymentAmount'])?.value),
            }
            this.paymentService.otherPayment(otherPayment).subscribe(
              (res) => {
                this.completeTransaction(false);
              },
              (error) => {
                console.log(error);
                this.completeTransaction(true, error);
              }
            )
          }
        }
      );
    }
    else if (this.paymentForm.get("paymentType")?.value === PaymentType.PAY_TO_DOCTOR && !this.isBusy) {
      const doctorName = this.doctors.find((doctor) => doctor.id === this.paymentForm.get(['doctorPayment', 'doctorName'])?.value)?.name;
      this.confirmPayment(`Do you want to share Rs.${this.totalDoctorPayment} to ${doctorName}.`).subscribe(
        (choice) => {
          if (choice) {
            this.isBusy = true;
            this.spinner.show();
            const doctorPayment: DoctorPaymentDTO = {
              doctorId: this.paymentForm.get(['doctorPayment', 'doctorName'])?.value,
              sessionId: this.paymentForm.get(['doctorPayment', 'sessionId'])?.value,
              description: this.paymentForm.get(['doctorPayment', 'description'])?.value,
              paymentAmount: 0,
            }
            this.paymentService.doctorPayment(doctorPayment).subscribe(
              (res) => {
                this.isBusy = false;
                this.spinner.hide();
                this.showNotification(false);
                this.doctorPaymentData = {
                  doctorName: this.selectedDoctor.name,
                  sessionStartsAt: this.selectedSession.startsAt,
                  totalPayment: this.totalDoctorPayment,
                  confirmedBookings: this.bookingPayments.length
                }
                setTimeout(() => {
                  this.isFirstPage = false;
                }, 0);
              },
              (error) => {
                console.log(error);
                this.completeTransaction(true, error);
              }
            )
          }
        }
      );
    }
  }
}
