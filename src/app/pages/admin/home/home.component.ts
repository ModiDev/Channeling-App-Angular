
import {Doctor} from "../../../core/commons/models/Doctor";
import {Component, Input, OnInit} from "@angular/core";
import {DoctorService} from "src/app/core/services/doctor/doctor.service";
import {ActiveStatus} from "src/app/core/commons/constants/Constant";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {AddDoctorFormComponent} from "../../doctor-management/add-doctor-form/add-doctor-form.component";
import {ViewDoctorComponent} from "../../doctor-management/view-doctor/view-doctor.component";
import {Service} from "../../../core/commons/models/Service";
import {ngbModalOptions} from "../../home/home-page/home.component";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  searchText: string = "";
  searchType: ActiveStatus | "all" = "all";

  doctors: Doctor[] = [];
  serviceObject!: Service;

  constructor(
    private doctorService: DoctorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.doctorService.getDoctorCollection().subscribe((actions) => {
      this.doctors = [];
      actions.forEach((action) => {
        this.doctors.push({
          ...action.payload.doc.data(),
          id: action.payload.doc.id,
        });
      });
    });
  }

  onChangeSearchText(value: any) {
    this.searchText = value;
  }
  onChangeSearchType(value: any) {
    this.searchType = value;
  }
  onActionClick() {
    this.modalService.open(AddDoctorFormComponent, ngbModalOptions);
  }

  openDoctorView(doctor: Doctor) {
    const modalOptions: NgbModalOptions = {
      ...ngbModalOptions,
      windowClass: 'doctor-view-class',
    }
    const modalRef = this.modalService.open(ViewDoctorComponent, modalOptions);
    modalRef.componentInstance.doctor = doctor;

  }

}
