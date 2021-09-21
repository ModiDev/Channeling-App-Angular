import { DrawerUpdateDTO } from "../../../core/commons/dtos/DrawerUpdateDTO";
import { DrawerAddDTO } from "../../../core/commons/dtos/DrawerAddDTO";
import { DrawerService } from "./../../../core/services/drawer/drawer.service";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "src/app/core/services/notification/notification.service";
import { Drawer } from "src/app/core/commons/models/Drawer";

@Component({
  selector: "app-add-drawer-modal",
  templateUrl: "./add-drawer-modal.component.html",
  styleUrls: ["./add-drawer-modal.component.scss"],
})
export class AddDrawerModalComponent implements OnInit {
  faCross = faTimes;
  addDrawerForm!: FormGroup;

  @Input() drawer?: Drawer;

  constructor(
    private drawerService: DrawerService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.addDrawerForm = this.formBuilder.group({
      drawerNo: new FormControl(this.drawer?.number || "", [Validators.required]),
      description: new FormControl(this.drawer?.description || "", [Validators.required]),
      pcName: new FormControl(this.drawer?.name || "", [Validators.required]),
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
    const data: DrawerAddDTO = {
      number:this.addDrawerForm.get("drawerNo")?.value,
      description: this.addDrawerForm.get("description")?.value,
      name: this.addDrawerForm.get("pcName")?.value,
    };
    this.drawerService.addDrawer(data).subscribe(
      () => {
        this.spinner.hide();
        this.activeModal.close();
        this.notifyService.showSuccess("Drawer added successfully!", "Success");
      },
      () => {
        this.spinner.hide();
        this.notifyService.showError("Drawer adding failed!", "Failure");
      }
    );
  }

  updateDrawer() {
    const data: DrawerUpdateDTO = {
      number:this.addDrawerForm.get("drawerNo")?.value,
      id: this.drawer?.id || "",
      description: this.addDrawerForm.get("description")?.value,
      name: this.addDrawerForm.get("pcName")?.value,
    };
    this.drawerService.updateDrawer(data).subscribe(
      () => {
        this.spinner.hide();
        this.activeModal.close();
        this.notifyService.showSuccess(
          "Drawer updated successfully!",
          "Success"
        );
      },
      () => {
        this.spinner.hide();
        this.notifyService.showError("Drawer update failed!", "Failure");
      }
    );
  }

  onSubmit() {
    if (!this.addDrawerForm.valid) {
      this.addDrawerForm.markAllAsTouched();
    } else {
      this.spinner.show();
      if (this.drawer) {
        this.updateDrawer();
      } else {
        this.addNewDrawer();
      }
    }
  }
}
