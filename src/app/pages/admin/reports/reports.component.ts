import { Component, OnInit } from '@angular/core';
import { TransactionSubject, TransactionType } from 'src/app/core/commons/constants/Constant';
import { TransactionSummery } from 'src/app/shared/modals/logout-view-modal/logout-view-modal.component';
import { CashBalanceTemplateData } from 'src/app/shared/print-templates/cash-balance-template/cash-balance-template.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fillPrintTemplateData();
  }

  printTamplateData!: CashBalanceTemplateData;

  isConfirmed: boolean = false;

  debitTransactionSummery: TransactionSummery = {
    groups: [
      {
        name: TransactionSubject.BOOKING_PAYMENT,
        subject: TransactionSubject.BOOKING_PAYMENT,
        value: 1000,
      },
      {
        name: TransactionSubject.BOOKING_REFUND,
        subject: TransactionSubject.BOOKING_REFUND,
        value: 1000,
      },
      {
        name: TransactionSubject.DOCTOR_PAYMENT,
        subject: TransactionSubject.DOCTOR_PAYMENT,
        value: 1000,
      },
      {
        name: TransactionSubject.DRAWER_TRANSFER,
        subject: TransactionSubject.DRAWER_TRANSFER,
        value: 1000,
      },
      {
        name: TransactionSubject.OTHER_PAYMENT,
        subject: TransactionSubject.OTHER_PAYMENT,
        value: 1000,
      },
    ],
    total: 5000,
    type: TransactionType.DEBIT,
  };
  creditTransactionSummery: TransactionSummery = {
    groups: [
      {
        name: TransactionSubject.BOOKING_PAYMENT,
        subject: TransactionSubject.BOOKING_PAYMENT,
        value: 1000,
      },
      {
        name: TransactionSubject.BOOKING_REFUND,
        subject: TransactionSubject.BOOKING_REFUND,
        value: 1000,
      },
      {
        name: TransactionSubject.DOCTOR_PAYMENT,
        subject: TransactionSubject.DOCTOR_PAYMENT,
        value: 1000,
      },
      {
        name: TransactionSubject.DRAWER_TRANSFER,
        subject: TransactionSubject.DRAWER_TRANSFER,
        value: 1000,
      },
      {
        name: TransactionSubject.OTHER_PAYMENT,
        subject: TransactionSubject.OTHER_PAYMENT,
        value: 1000,
      },
    ],
    total: 5000,
    type: TransactionType.CREDIT,
  };

  loginTime = new Date();
  logoutTime = new Date();
  ConfirmedAppointments = 20;
  drawerNo = 5;
  systemBalance = 6000;
  toNextCashier = 2000;
  cashInHand: number = 0;

  fillPrintTemplateData() {
    this.printTamplateData = {
      userName: "kamal",
      loginTime: this.loginTime,
      logoutTime: this.logoutTime,
      ConfirmedAppointments: this.ConfirmedAppointments,
      drawerNo: this.drawerNo,
      systemBalance: this.systemBalance,
      toNextCashier: this.toNextCashier,
      cashInHand: this.cashInHand,
      debitTransactionSummery: this.debitTransactionSummery,
      creditTransactionSummery: this.creditTransactionSummery,
    };
  }
}
