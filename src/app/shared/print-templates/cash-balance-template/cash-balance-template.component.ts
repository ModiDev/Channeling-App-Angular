import { Component, Input, OnInit } from '@angular/core';
import { TransactionSummery } from '../../modals/logout-view-modal/logout-view-modal.component';


export interface CashBalanceTemplateData{
  userName:string;
  loginTime:Date;
  logoutTime:Date;
  ConfirmedAppointments:number;
  drawerNo:number;
  systemBalance:number;
  toNextCashier:number;
  cashInHand:number;
  debitTransactionSummery: TransactionSummery;
  creditTransactionSummery: TransactionSummery;
}
@Component({
  selector: 'app-cash-balance-template',
  templateUrl: './cash-balance-template.component.html',
  styleUrls: ['./cash-balance-template.component.scss']
})
export class CashBalanceTemplateComponent implements OnInit {

  @Input() data!:CashBalanceTemplateData

  constructor() { }

  ngOnInit(): void {
  }

}
