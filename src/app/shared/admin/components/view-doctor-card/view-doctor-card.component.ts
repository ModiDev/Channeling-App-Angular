import { ActiveStatus } from '../../../../core/commons/constants/Constant';
import { Doctor } from '../../../../core/commons/models/Doctor';
import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-view-doctor-card',
  templateUrl: './view-doctor-card.component.html',
  styleUrls: ['./view-doctor-card.component.scss']
})
export class ViewDoctorCardComponent implements OnInit {

  isInactive:boolean = false

  @Input() doctor?:Doctor


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isInactive = this.doctor?.status === ActiveStatus.DELETE || this.doctor?.status=== ActiveStatus.DE_ACTIVE;
  }


}
