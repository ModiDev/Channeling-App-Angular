import { DiscountTypeUpdateDTO } from "../../../core/commons/dtos/DiscountTypeUpdateDTO";
import { DiscountService } from "src/app/core/services/discount/discount.service";
import { DiscountTypeAddDTO } from "../../../core/commons/dtos/DiscountTypeAddDTO";
import { DiscountType } from "../../../core/commons/models/DiscountType";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "src/app/core/services/notification/notification.service";
import { Drawer } from "src/app/core/commons/models/Drawer";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { DrawerService } from "src/app/core/services/drawer/drawer.service";
import { DrawerAddDTO } from "src/app/core/commons/dtos/DrawerAddDTO";
import { DrawerUpdateDTO } from "src/app/core/commons/dtos/DrawerUpdateDTO";

@Component({
  selector: "app-add-discount-model",
  templateUrl: "./add-discount-model.component.html",
  styleUrls: ["./add-discount-model.component.scss"],
})
export class AddDiscountModelComponent implements OnInit {
  faCross = faTimes;
  addDrawerForm!: FormGroup;

  @Input() discount?: DiscountType;

  constructor(
    private discountSrtvice: DiscountService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.addDrawerForm = this.formBuilder.group({
      name: new FormControl(this.discount?.name || "", [Validators.required]),
      presentage: new FormControl(this.discount?.value || "", [
        Validators.required,
      ]),
      reduceFrom: new FormControl("", [Validators.required]),
    });
  }

  isInvalid(name: string) {
    return (
      this.addDrawerForm.get(name)?.invalid &&
      (this.addDrawerForm.get(name)?.dirty ||
        this.addDrawerForm.get(name)?.touched)
    );
  }

  addNewDrawer() {
    const data: DiscountTypeAddDTO = {
      name: this.addDrawerForm.get("name")?.value,
      value: this.addDrawerForm.get("presentage")?.value,
    };
    // name: this.addDrawerForm.get("reduceFrom")?.value,
    this.discountSrtvice.addDiscount(data).subscribe(
      () => {
        this.spinner.hide();
        this.activeModal.close();
        this.notifyService.showSuccess("Discount added successfully!", "Success");
      },
      () => {
        this.spinner.hide();
        this.notifyService.showError("Discount add failed!", "Failure");
      }
    );
  }

  updateDrawer() {
    const data: DiscountTypeUpdateDTO = {
      name: this.addDrawerForm.get("name")?.value,
      id: this.discount?.id || "",
      value: this.addDrawerForm.get("presentage")?.value,
    };
    // name: this.addDrawerForm.get("reduceFrom")?.value,
    this.discountSrtvice.updateDiscount(data).subscribe(
      () => {
        this.spinner.hide();
        this.activeModal.close();
        this.notifyService.showSuccess(
          "Discount updated successfully!",
          "Success"
        );
      },
      () => {
        this.spinner.hide();
        this.notifyService.showError("Discount update failed!", "Failure");
      }
    );
  }

  onSubmit() {
    if (!this.addDrawerForm.valid) {
      this.addDrawerForm.markAllAsTouched();
    } else {
      this.spinner.show();
      if (this.discount) {
        this.updateDrawer();
      } else {
        this.addNewDrawer();
      }
    }
  }
}
