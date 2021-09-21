import { Component, Input, OnInit } from '@angular/core';

export interface ReceiptTemplateFees{
  name:string;
  hospitalFee:number
  doctorFee:number
  total:number
}

export interface ReceiptTemplateData{
  invoiceNo:string;
  patientNo:string;
  patientName:string;
  doctorName:string;
  contact:string;
  bookingDate:Date;
  sessionStartAt:Date;
  sessionEndAt:Date;
  fees:ReceiptTemplateFees[];
  total:number;
  misc:number,
  isRefund:boolean;
  refundAmmount?:number;
  discount:number,
  paid:number,
  paymentType:string;
  createdBy:string,
  createdAt:Date
}

@Component({
  selector: 'app-receipt-template',
  templateUrl: './receipt-template.component.html',
  styleUrls: ['./receipt-template.component.scss']
})
export class ReceiptTemplateComponent implements OnInit {

  @Input() data!:ReceiptTemplateData

  constructor() { }

  ngOnInit(): void {
  }

}
