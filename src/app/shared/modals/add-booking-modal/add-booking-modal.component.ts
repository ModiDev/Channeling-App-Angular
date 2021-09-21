import {LocalStorageService} from "./../../../core/services/local-storage/local-storage.service";
import {Component, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable, OperatorFunction, Subscription} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
} from "rxjs/operators";
import {BookingService} from "src/app/core/services/booking/booking.service";
import {DiscountService} from "src/app/core/services/discount/discount.service";
import {EmployeeService} from "src/app/core/services/employee/employee.service";
import {NotificationService} from "src/app/core/services/notification/notification.service";
import {
  ActiveStatus,
  BookingPlatform,
  BookingStatus,
  PatientConfirmationType,
  PaymentMethod,
} from "src/app/core/commons/constants/Constant";
import {BookingTemplateCreateDTO} from "src/app/core/commons/dtos/BookingTemplateCreateDTO";
import {CreateBookingDTO} from "src/app/core/commons/dtos/CreateBookingDTO";
import {UpdateBookingDTO} from "src/app/core/commons/dtos/UpdateBookingDTO";
import {Booking} from "src/app/core/commons/models/Booking";
import {BookingTemplate} from "src/app/core/commons/models/BookingTemplate";
import {DiscountType} from "src/app/core/commons/models/DiscountType";
import {Employee} from "src/app/core/commons/models/Employee";
import {Patient} from "src/app/core/commons/models/Patient";
import {Service} from "src/app/core/commons/models/Service";
import {Session} from "src/app/core/commons/models/Session";
import {AppointmentsViewComponent} from "src/app/shared/modals/appointments-view/appointments-view.component";
import {ngbModalOptions} from "src/app/pages/home/home-page/home.component";

@Component({
  selector: "app-add-booking-modal",
  templateUrl: "./add-booking-modal.component.html",
  styleUrls: ["./add-booking-modal.component.scss"],
})
export class AddBookingModalComponent implements OnInit {
  faCross = faTimes;

  booking!: Booking;
  session!: Session;
  patient!: Patient;
  bookingTemplate!: BookingTemplate | undefined;

  submitButtonTitle: string = "CONFIRM";

  modalTitle: string = "ADD APPOINTMENT";

  isEdit: boolean = false;
  isConfirmEdit: boolean = false;
  isBusy: boolean = false;

  bookingForm!: FormGroup;
  bookingFormConfirmed!: FormGroup;
  error: string = "";

  isFemale: boolean = false;
  isTentative: boolean = true;
  isAdditionalPayment: boolean = false;
  isDiscount: boolean = false;

  isFirstPage: boolean = true;
  isPatientNoLoading: boolean = true;

  selectedServices: Service[] = [];
  additionalFees: Service[] = [];
  patientNo: number = 0;

  discountListSubscription: Subscription = new Subscription();
  discounts: DiscountType[] = [];

  employeeListSubscription: Subscription = new Subscription();
  employees: Employee[] = [];

  public employeePipeModel!: Employee;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private discountService: DiscountService,
    private notifyService: NotificationService,
    private employeeService: EmployeeService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.max(120), Validators.min(1)]),
      contactNo: new FormControl(null, [Validators.required]),
      patientNo: new FormControl(null, []),
      nicNo: new FormControl(null, []),
      address: new FormControl(null, []),
    });

    this.bookingFormConfirmed = this.formBuilder.group({
      paymentMethod: new FormControl("CASH", [Validators.required]),
      discountType: new FormControl("", []),
      employeeName: new FormControl("", []),
    });

    if (this.booking === undefined) {
      const createBookingTemplate: BookingTemplateCreateDTO = {
        sessionId: this.session.id as string,
        bookingPlatform: BookingPlatform.WEB,
      };

      this.bookingService.createBookingTemplate(createBookingTemplate).subscribe(
        (res) => {
          if (res.data.id !== -1) {
            this.bookingService.getBookingTemplateById(res.data.id).subscribe(
              (template) => {
                this.bookingTemplate = template;
                if (this.bookingTemplate !== undefined) {
                  setTimeout(() => {
                    this.bookingForm.patchValue({
                      patientNo: this.bookingTemplate?.patientNo
                    })
                  }, 0);

                  this.patientNo = this.bookingTemplate?.patientNo as number;
                }

                this.isPatientNoLoading = false;
              }
            );
          }

        },
        (error) => {
          this.isPatientNoLoading = false;
        }
      )
    }

    this.session.services.forEach((value) => this.selectService(value));

    if (this.booking !== undefined) {
      this.modalTitle = "UPDATE APPOINTMENT";
      this.submitButtonTitle = "UPDATE";
      this.bookingForm.setValue({
        name: this.booking.patientName,
        age: this.booking.patient?.age,
        contactNo: this.booking.patient?.mobile,
        patientNo: this.booking.patientNo,
        nicNo: this.booking.patient?.nicOrPassport,
        address: this.booking.patient?.address,
      });

      this.patient = this.booking.patient as Patient;
      this.isTentative = this.booking.bookingStatus !== BookingStatus.CONFIRMED;
      if (this.isConfirmEdit) {
        this.isTentative = false;
      }

      if (
        this.booking.additionalFees !== undefined &&
        this.booking.additionalFees.length > 0
      ) {
        this.isAdditionalPayment = true;
      }

      if (this.booking.discountType !== undefined) {
        this.isDiscount = true;
      }

      this.isPatientNoLoading = false;
    }

    this.discountListSubscription = this.discountService
      .getDiscountTypesCollection()
      .subscribe((value) => {
        this.discounts = value.docs.map((discountVal) => {
          return {
            ...(discountVal.data() as DiscountType),
            id: discountVal.id,
          };
        });
      });

    this.employeeListSubscription = this.employeeService
      .getEmployeesCollection()
      .subscribe((value) => {
        this.employees = value.docs.map((emplVal) => {
          return {
            ...(emplVal.data() as Employee),
            id: emplVal.id,
          };
        });
      });
  }

  ngOnDestroy(): void {
    if (this.discountListSubscription)
      this.discountListSubscription.unsubscribe();
    if (this.employeeListSubscription)
      this.employeeListSubscription.unsubscribe();
  }

  search: OperatorFunction<string, readonly Employee[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.employees
            .filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10)
      )
    );

  formatter = (employee: Employee) => employee.name;

  selectGender(isFemale: boolean) {
    this.isFemale = isFemale;
  }

  selectBookingStatus(isTentative: boolean) {
    this.isTentative = isTentative;
  }

  selectService(value: Service) {
    if (!this.selectedServices.includes(value))
      this.selectedServices.push(value);
    else {
      const index = this.selectedServices.indexOf(value, 0);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    this.selectAdditionalService(value);
  }

  selectAdditionalService(value: Service) {
    if (!this.additionalFees.find((val) => val.service === value.service))
      this.additionalFees.push({
        ...value,
        doctorFee: 0,
        hospitalFee: 0,
        cashDiscountFee: 0,
      });
    else {
      const index = this.additionalFees.findIndex(
        (val) => val.service === value.service
      );
      if (index > -1) {
        this.additionalFees.splice(index, 1);
      }
    }
  }

  checkServiceIsSelected(value: Service) {
    return this.selectedServices.includes(value);
  }

  goBack() {
    this.isFirstPage = true;
  }

  isAdditionalSwitch() {
    setTimeout(() => {
      this.isAdditionalPayment = !this.isAdditionalPayment;
    }, 0);
  }

  isDiscountSwitch() {
    setTimeout(() => {
      this.isDiscount = !this.isDiscount;
    });
  }

  getAvailableNumbers(): number[] {
    return this.session.availableNumbers.filter((val) => val > 5);
  }

  getReservedNumbers(): number[] {
    return this.session.availableNumbers.filter((val) => val <= 5);
  }

  onTentativeConfirm() {
    if (this.bookingForm.valid && !this.isBusy) {
      this.patient = {
        name: this.bookingForm.get("name")?.value,
        nameSimple: this.bookingForm.get("name")?.value.toLowerCase(),
        nicOrPassport: this.bookingForm.get("nicNo")?.value ?? "",
        mobile: this.bookingForm.get("contactNo")?.value,
        address: this.bookingForm.get("address")?.value ?? "",
        age: Number(this.bookingForm.get("age")?.value ?? 1),
        sex: this.isFemale ? "Female" : "Male",
      };

      if (this.isTentative) {
        this.spinner.show();
        this.isBusy = true;
        const bookingTentative: CreateBookingDTO = {
          status: ActiveStatus.ACTIVE,
          doctorId: this.session.doctorId as string,
          bookingTemplateId: this.bookingTemplate?.id,
          bookingStatus: BookingStatus.TENTATIVE,
          patientId: "",
          sessionId: this.session.id as string,
          referenceNo: "",
          patientNo: Number(this.bookingForm.get("patientNo")?.value),
          patient: this.patient,
          patientName: this.patient.name,
          bookingPlatform: BookingPlatform.WEB,
          paymentMethod:
            this.bookingForm.get("paymentMethod")?.value === "CASH"
              ? PaymentMethod.CASH
              : PaymentMethod.CARD,
          services: this.session.services,
          additionalFees: [],
          discountTypeId: "",
          employeeId: "",
        };
        if (!this.isEdit) {
          this.bookingService
            .addBooking(bookingTentative)
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe(
              (success) => {
                const createdBooking: Booking = {
                  ...bookingTentative,
                  id: success.data,
                  patientConfirmation: PatientConfirmationType.DEFAULT,
                  patientContactNo: this.patient.mobile,
                  patientNameSimple: this.patient.nameSimple,
                  sessionDate: this.session.sessionDate,
                  sessionStartsAt: this.session.startsAt,
                  sessionEndsAt: this.session.endsAt,
                };
                this.isBusy = false;
                this.notifyService.showSuccess(
                  "Appointment added successfully!",
                  "Success"
                );
                this.activeModal.close();
              },
              (error) => {
                this.error = error;
                console.log(error.code);
                console.log(error.message);
                this.isBusy = false;
                this.notifyService.showError(
                  "Appointment adding failed!",
                  "Failure"
                );
              }
            );
        } else {
          this.bookingService
            .updateBooking({
              ...bookingTentative,
              id: this.booking.id as string,
            })
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe(
              (success) => {
                const createdBooking: Booking = {
                  ...bookingTentative,
                  id: this.booking.id as string,
                  patientConfirmation: PatientConfirmationType.DEFAULT,
                  patientContactNo: this.patient.mobile,
                  patientNameSimple: this.patient.nameSimple,
                  sessionDate: this.session.sessionDate,
                  sessionStartsAt: this.session.startsAt,
                  sessionEndsAt: this.session.endsAt,
                };
                this.isBusy = false;
                this.activeModal.close();
                this.notifyService.showSuccess(
                  "Appointment updated successfully!",
                  "Success"
                );
              },
              (error) => {
                this.error = error;
                console.log(error.code);
                console.log(error.message);
                this.isBusy = false;
                this.notifyService.showError(
                  "Appointment updating failed!",
                  "Failure"
                );
              }
            );
        }
      } else {
        this.isFirstPage = false;
      }
    }
  }

  onConfirm() {
    if (this.bookingFormConfirmed.valid && !this.isBusy) {
      this.spinner.show();
      this.isBusy = true;
      if (!this.isEdit) {
        const bookingConfirmed: CreateBookingDTO = {
          status: ActiveStatus.ACTIVE,
          doctorId: this.session.doctorId as string,
          bookingTemplateId: this.bookingTemplate?.id,
          bookingStatus: BookingStatus.CONFIRMED,
          patientId: "",
          sessionId: this.session.id as string,
          referenceNo: "",
          patientNo: Number(this.bookingForm.get("patientNo")?.value ?? 1),
          patient: this.patient,
          patientName: this.patient.name,
          bookingPlatform: BookingPlatform.WEB,
          paymentMethod:
            this.bookingFormConfirmed.get("paymentMethod")?.value === "CASH"
              ? PaymentMethod.CASH
              : PaymentMethod.CARD,
          services: this.selectedServices,
          additionalFees: this.isAdditionalPayment ? this.additionalFees : [],
          discountTypeId: this.isDiscount
            ? this.discounts.find(
              (value) =>
                value.nameLowerCase ===
                this.bookingFormConfirmed.get("discountType")?.value
            )?.id ?? ""
            : "",
          employeeId:
            this.employees.find(
              (value) =>
                value.name.toLowerCase ===
                this.bookingFormConfirmed.get("employeeName")?.value
            )?.id ?? "",
        };
        this.bookingService
          .addBooking(bookingConfirmed)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(
            (success) => {
              const createdBooking: Booking = {
                ...bookingConfirmed,
                id: success.data,
                patientConfirmation: PatientConfirmationType.DEFAULT,
                patientContactNo: this.patient.mobile,
                patientNameSimple: this.patient.nameSimple,
                sessionDate: this.session.sessionDate,
                sessionStartsAt: this.session.startsAt,
                sessionEndsAt: this.session.endsAt,
                discountType: this.discounts.find(
                  (value) =>
                    value.nameLowerCase ===
                    this.bookingFormConfirmed.get("discountType")?.value
                ),
                discountTypeName: this.discounts.find(
                  (value) =>
                    value.nameLowerCase ===
                    this.bookingFormConfirmed.get("discountType")?.value
                )?.name,
                employee: this.employees.find(
                  (value) =>
                    value.name.toLowerCase ===
                    this.bookingFormConfirmed.get("employeeName")?.value
                ),
              };
              this.activeModal.close();
              const modalOptions: NgbModalOptions = {
                ...ngbModalOptions,
                windowClass: 'my-class-booking-view'
              }
              const modalRef = this.modalService.open(
                AppointmentsViewComponent,
                modalOptions
              );
              modalRef.componentInstance.booking = createdBooking;
              modalRef.componentInstance.session = this.session;
              this.localStorageService.saveLastRecipt({
                booking: createdBooking,
                session: this.session,
              });
              this.isBusy = false;
              this.notifyService.showSuccess(
                "Appointment added successfully!",
                "Success"
              );
            },
            (error) => {
              this.error = error;
              console.log(error.code);
              console.log(error.message);
              this.isBusy = false;
              this.notifyService.showError(
                "Appointment adding failed!",
                "Failure"
              );
            }
          );
      } else {
        const bookingUpdate: UpdateBookingDTO = {
          id: this.booking.id as string,
          status: ActiveStatus.ACTIVE,
          doctorId: this.session.doctorId as string,
          bookingStatus: BookingStatus.CONFIRMED,
          patientId: "",
          sessionId: this.session.id as string,
          referenceNo: "",
          patientNo: Number(this.bookingForm.get("patientNo")?.value ?? 1),
          patient: this.patient,
          patientName: this.patient.name,
          bookingPlatform: BookingPlatform.WEB,
          paymentMethod:
            this.bookingForm.get("paymentMethod")?.value === "CASH"
              ? PaymentMethod.CASH
              : PaymentMethod.CARD,
          services: this.selectedServices,
          additionalFees: this.additionalFees,
          discountTypeId:
            this.discounts.find(
              (value) =>
                value.nameLowerCase ===
                this.bookingFormConfirmed.get("discountType")?.value
            )?.id ?? "",
          employeeId:
            this.employees.find(
              (value) =>
                value.name.toLowerCase ===
                this.bookingFormConfirmed.get("employeeName")?.value
            )?.id ?? "",
        };

        this.bookingService
          .updateBooking(bookingUpdate)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(
            (success) => {
              const updatedBooking: Booking = {
                ...bookingUpdate,
                id: success.data,
                patientContactNo: this.patient.mobile,
                patientNameSimple: this.patient.nameSimple,
                patientConfirmation: PatientConfirmationType.DEFAULT,
                sessionDate: this.session.sessionDate,
                sessionStartsAt: this.session.startsAt,
                sessionEndsAt: this.session.endsAt,
                discountType: this.discounts.find(
                  (value) =>
                    value.nameLowerCase ===
                    this.bookingFormConfirmed.get("discountType")?.value
                ),
                discountTypeName: this.discounts.find(
                  (value) =>
                    value.nameLowerCase ===
                    this.bookingFormConfirmed.get("discountType")?.value
                )?.name,
                employee: this.employees.find(
                  (value) =>
                    value.name.toLowerCase ===
                    this.bookingFormConfirmed.get("employeeName")?.value
                ),
              };
              this.activeModal.close();
              const modalOptions: NgbModalOptions = {
                ...ngbModalOptions,
                windowClass: 'my-class-booking-view'
              }
              const modalRef = this.modalService.open(
                AppointmentsViewComponent,
                modalOptions
              );
              modalRef.componentInstance.booking = updatedBooking;
              modalRef.componentInstance.session = this.session;
              this.localStorageService.saveLastRecipt({
                booking: updatedBooking,
                session: this.session,
              });
              this.isBusy = false;
              this.notifyService.showSuccess(
                "Appointment updated successfully!",
                "Success"
              );
            },
            (error) => {
              this.error = error;
              console.log(error.code);
              console.log(error.message);
              this.isBusy = false;
              this.notifyService.showError(
                "Appointment updating failed!",
                "Failure"
              );
            }
          );
      }
    }
  }
}
