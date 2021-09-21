import {UpdateDoctorDTO} from "../../../core/commons/dtos/UpdateDoctorDTO";
import {DoctorService} from "../../../core/services/doctor/doctor.service";
import {Service} from "../../../core/commons/models/Service";
import {Doctor} from "../../../core/commons/models/Doctor";
import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceType, Specialty} from "src/app/core/commons/constants/Constant";
import {CreateDoctorDTO} from "src/app/core/commons/dtos/CreateDoctorDTO";
import {NotificationService} from "src/app/core/services/notification/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

interface PersonalDetails {
  name: string;
  speciality: Specialty;
  title: string;
  contactNumber: string;
  email: string;
  hospital: string;
  profilePicture: string;
  profileUrl: File;
}

interface PaymentDetails {
  services: Service[];
}

interface DoctorForm {
  personalDetails: PersonalDetails;
  paymentDetails: PaymentDetails;
}

@Component({
  selector: "app-add-doctor-form",
  templateUrl: "./add-doctor-form.component.html",
  styleUrls: ["./add-doctor-form.component.scss"],
})
export class AddDoctorFormComponent implements OnInit {
  faCross = faTimes;
  doctorTitle: string = "ADD DOCTOR";
  public currentStep = 0;

  @Input() doctor!: Doctor;
  isUpdate: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public doctorService: DoctorService,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    if (this.doctor) {
      this.isUpdate = true;
      this.form = new FormGroup({
        personalDetails: new FormGroup({
          name: new FormControl(this.doctor.name, Validators.required),
          speciality: new FormControl(
            this.doctor.specialty,
            Validators.required
          ),
          title: new FormControl(this.doctor.title, Validators.required),
          contactNumber: new FormControl(this.doctor.contact, [
            Validators.required,
            Validators.pattern(
              /(^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$)/
            ),
          ]),
          email: new FormControl(this.doctor.email, [Validators.email]),
          hospital: new FormControl(this.doctor.hospital, [
            Validators.required,
          ]),
          profilePicture: new FormControl(this.doctor.profileImgUrl),
          profileUrl: new FormControl(this.doctor.profileImgUrl),
        }),
        paymentDetails: new FormGroup({
          services: new FormArray(
            this.doctor.services?.map(
              (service) =>
                new FormGroup({
                  service: new FormControl(
                    service.service,
                    Validators.required
                  ),
                  doctorFee: new FormControl(
                    service.doctorFee,
                    Validators.required
                  ),
                  hospitalFee: new FormControl(
                    service.hospitalFee,
                    Validators.required
                  ),
                  cashDiscountFee: new FormControl(
                    service.cashDiscountFee,
                    Validators.required
                  ),
                })
            ) || [],
            [Validators.required]
          ),
        }),
      });
    }
  }

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
      label: "Personal Details",
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
    {
      label: "Payment Details",
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
  ];

  public form = new FormGroup({
    personalDetails: new FormGroup({
      name: new FormControl("", Validators.required),
      speciality: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      contactNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /(^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$)/
        ),
      ]),
      email: new FormControl("", [Validators.email]),
      hospital: new FormControl("", [Validators.required]),
      profilePicture: new FormControl(""),
      profileUrl: new FormControl(""),
    }),
    paymentDetails: new FormGroup({
      services: new FormArray([], [Validators.required]),
    }),
  });

  createServiceFormField(serviceType: ServiceType): void {
    const payments = this.form.get("paymentDetails") as FormGroup;
    const services = payments.get("services") as FormArray;
    services.push(
      new FormGroup({
        service: new FormControl(serviceType, Validators.required),
        doctorFee: new FormControl("", Validators.required),
        hospitalFee: new FormControl("", Validators.required),
        cashDiscountFee: new FormControl("", Validators.required),
      })
    );
  }

  removeServiceFormField(serviceType: ServiceType): void {
    const payments = this.form.get("paymentDetails") as FormGroup;
    const services = payments.get("services") as FormArray;
    const values = services.value as Service[];
    services.removeAt(values.findIndex((s) => s.service === serviceType));
  }

  public next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      this.currentStep += 1;
      return;
    }

    this.currentGroup.markAllAsTouched();
  }

  public prev(): void {
    this.currentStep -= 1;
  }

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map((groupName) =>
      this.form.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }

  onAddService(event: {st: ServiceType; isAdd: boolean}) {
    if (event.isAdd) {
      this.createServiceFormField(event.st);
    } else {
      this.removeServiceFormField(event.st);
    }
  }

  addNewDoctor() {
    if (!this.currentGroup.valid) {
      this.currentGroup.markAllAsTouched();
    }

    if (this.form.valid) {
      const form: DoctorForm = this.form.value as DoctorForm;

      const imageFile = form.personalDetails.profileUrl;
      const uploadTask = this.doctorService.uploadDoctorImage(imageFile);
      uploadTask.percentageChanges().subscribe((per) => {
        console.log("uploaded:" + per);
      });
      this.spinner.show();
      uploadTask
        .then((snap) => {
          snap.ref.getDownloadURL().then((url) => {
            const doctor: CreateDoctorDTO = {
              name: form.personalDetails.name,
              email: form.personalDetails.email,
              hospital: form.personalDetails.hospital,
              misc: 0,
              title: form.personalDetails.title,
              contact: form.personalDetails.contactNumber,
              specialty: form.personalDetails.speciality,
              services: form.paymentDetails.services.map((value) => {
                return {
                  service: value.service,
                  doctorFee: Number(value.doctorFee),
                  hospitalFee: Number(value.hospitalFee),
                  cashDiscountFee: Number(value.cashDiscountFee),
                }
              }),
              profileImgUrl: url,
            };

            this.doctorService.addDoctor(doctor).subscribe(
              () => {
              },
              (error) => {
                this.spinner.hide();
                this.notifyService.showError(
                  "Doctor adding failed!",
                  "Failure"
                );
              },
              () => {
                this.spinner.hide();
                this.notifyService.showSuccess(
                  "Doctor added successfully!",
                  "Success"
                );
                this.activeModal.close();
              }
            );
          });
        })
        .catch(() => {
          this.spinner.hide();
        });
    }
  }

  updateDoctor() {
    if (!this.currentGroup.valid) {
      this.currentGroup.markAllAsTouched();
    }

    if (this.form.valid) {
      const form: DoctorForm = this.form.value as DoctorForm;

      const imageFile = form.personalDetails.profileUrl;
      this.spinner.show();
      if (imageFile && imageFile instanceof File && this.doctor.id) {
        const uploadTask = this.doctorService.uploadDoctorImage(imageFile);
        uploadTask.percentageChanges().subscribe((per) => {
          console.log("uploaded:" + per);
        });

        uploadTask
          .then((snap) => {
            snap.ref.getDownloadURL().then((url) => {
              const doctor: UpdateDoctorDTO = {
                id: this.doctor.id || "",
                name: form.personalDetails.name,
                email: form.personalDetails.email,
                hospital: form.personalDetails.hospital,
                misc: 0,
                title: form.personalDetails.title,
                contact: form.personalDetails.contactNumber,
                specialty: form.personalDetails.speciality,
                services: form.paymentDetails.services,
                profileImgUrl: url,
              };
              this.doctorService.updateDoctor(doctor).subscribe(
                () => {
                },
                (error) => {
                  this.spinner.hide();
                  this.notifyService.showError(
                    "Doctor Update failed!",
                    "Failure"
                  );
                },
                () => {
                  this.spinner.hide();
                  this.notifyService.showSuccess(
                    "Doctor Updated successfully!",
                    "Success"
                  );
                  this.activeModal.close();
                }
              );
            });
          })
          .catch(() => {
            this.spinner.hide();
          });
      } else {
        const doctor: UpdateDoctorDTO = {
          id: this.doctor.id || "",
          name: form.personalDetails.name,
          email: form.personalDetails.email,
          hospital: form.personalDetails.hospital,
          misc: 0,
          title: form.personalDetails.title,
          contact: form.personalDetails.contactNumber,
          specialty: form.personalDetails.speciality,
          services: form.paymentDetails.services,
          profileImgUrl: this.doctor.profileImgUrl,
        };
        this.doctorService.updateDoctor(doctor).subscribe(
          () => {
          },
          (error) => {
            this.spinner.hide();
            this.notifyService.showError("Doctor Update failed!", "Failure");
          },
          () => {
            this.spinner.hide();
            this.notifyService.showSuccess(
              "Doctor Updated successfully!",
              "Success"
            );
            this.activeModal.close();
          }
        );
      }
    }
  }

  onSubmit() {
    if (this.isUpdate) {
      this.updateDoctor();
    } else {
      this.addNewDoctor();
    }
  }
}
