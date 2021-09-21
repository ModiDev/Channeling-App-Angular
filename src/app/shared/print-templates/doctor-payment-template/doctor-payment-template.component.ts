import {Component, Input, OnInit} from '@angular/core';

export interface DoctorPaymentTemplateData {
  doctorName: string;
  sessionStartsAt: Date;
  confirmedBookings: number;
  totalPayment: number;
}

@Component({
  selector: 'app-doctor-payment-template',
  templateUrl: './doctor-payment-template.component.html',
  styleUrls: ['./doctor-payment-template.component.scss']
})
export class DoctorPaymentTemplateComponent implements OnInit {

  @Input() data!: DoctorPaymentTemplateData;

  constructor() { }

  ngOnInit(): void {
  }

}
