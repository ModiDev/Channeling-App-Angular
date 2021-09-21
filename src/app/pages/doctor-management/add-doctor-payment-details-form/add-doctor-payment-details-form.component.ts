import {FormArray, FormGroup} from "@angular/forms";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ServiceType} from "src/app/core/commons/constants/Constant";
import {Service} from "src/app/core/commons/models/Service";

interface ServiceTypeObject {
  id: string;
  name: ServiceType;
  checked: boolean;
}

@Component({
  selector: "app-add-doctor-payment-details-form",
  templateUrl: "./add-doctor-payment-details-form.component.html",
  styleUrls: ["./add-doctor-payment-details-form.component.scss"],
})
export class AddDoctorPaymentDetailsFormComponent implements OnInit {
  faCross = faTimes;
  serviceTypesString: ServiceTypeObject[] = [];

  @Input() public formGroup!: FormGroup;
  @Input() public services!: Service[];

  @Output() onAddService = new EventEmitter<{
    st: ServiceType;
    isAdd: boolean;
  }>();

  constructor() {
  }

  ngOnInit(): void {
    this.serviceTypesString = this.getServiceTypesAsList();
  }

  onClickService(serviceType: ServiceType, add: boolean = true) {
    this.onAddService.emit({st: serviceType, isAdd: add});
  }

  get serviceForm() {
    return this.formGroup.get("services") as FormArray;
  }

  onChange(e: Event, x: ServiceType) {
    const checked = (e.target as HTMLInputElement).checked;
    console.log(checked, x);
    this.onClickService(x, checked);
  }

  getServiceTypesAsList(): ServiceTypeObject[] {
    const arrayObjects: ServiceTypeObject[] = [];
    for (const entry of Object.entries(ServiceType)) {
      const [propertyKey, propertyValue] = entry;

      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({
        id: propertyKey,
        name: propertyValue,
        checked:
          this.services.find((x) => x.service === propertyValue) !==
          undefined,
      });
    }
    return arrayObjects;
  }

  isInvalid(group: any, name: string) {
    return (
      group.get(name)?.invalid &&
      (group.get(name)?.dirty || group.get(name)?.touched)
    );
  }

  isInvalidArray() {
    const sl = this.formGroup.get("services") as FormArray;
    return sl.length <= 0;
  }
}
