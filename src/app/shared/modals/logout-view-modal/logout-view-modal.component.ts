import { DrawerService } from "src/app/core/services/drawer/drawer.service";
import { PrintingService } from "./../../../core/services/printing/printing.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { UserFirestore } from "src/app/core/commons/models/UserFirestore";
import { CashBalanceTemplateData } from "../../print-templates/cash-balance-template/cash-balance-template.component";
import { UserService } from "src/app/core/services/user/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import {
  TransactionSubject,
  TransactionType,
} from "src/app/core/commons/constants/Constant";
import { TransactionsService } from "src/app/core/services/transaction/transactions.service";

export interface TransactionGroup {
  name: string;
  value: number;
  subject: string;
}

export interface TransactionSummery {
  groups: TransactionGroup[];
  type: TransactionType;
  total: number;
}

@Component({
  selector: "app-logout-view-modal",
  templateUrl: "./logout-view-modal.component.html",
  styleUrls: ["./logout-view-modal.component.scss"],
})
export class LogoutViewModalComponent implements OnInit {
  faCross = faTimes;

  user!: UserFirestore;

  confirmedBookingPayment: number = 0;

  printTamplateData!: CashBalanceTemplateData;

  isConfirmed: boolean = false;

  debitTransactionSummery: TransactionSummery = {
    groups: [],
    total: 0,
    type: TransactionType.DEBIT,
  };
  creditTransactionSummery: TransactionSummery = {
    groups: [],
    total: 0,
    type: TransactionType.CREDIT,
  };

  loginTime = new Date();
  logoutTime = new Date();
  ConfirmedAppointments = 20;
  drawerNo = "";
  systemBalance = 6000;
  toNextCashier = 2000;
  cashInHand: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private transactionService: TransactionsService,
    private authService: AuthService,
    private userService: UserService,
    private printingService: PrintingService,
    private drawerService: DrawerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.userService.getUserByUid(user.uid).subscribe((fUser) => {
          this.user = fUser;
          console.log((fUser.lastLogin as any).toDate());
          this.loginTime = (fUser.lastLogin as any).toDate();
          this.logoutTime = fUser.lastLogout
            ? (fUser.lastLogout as any).toDate()
            : new Date();

          if (fUser.currentDrawerId) {
            this.getAllTransactions(fUser.currentDrawerId);
            this.drawerService
              .getDrawerById(fUser.currentDrawerId)
              .subscribe((drawer) => {
                this.systemBalance = drawer.currentBalance | 0;
                this.drawerNo = drawer.number;
                console.log(drawer.number);
              });
          }
        });
      }
    });
    this.fillPrintTemplateData();
  }

  getAllTransactions(drawerId: string) {
    this.transactionService
      .getAllTransactionsInThisSession(
        this.user.uid,
        this.user.lastLogin || new Date(), // this.user.lastLogin
        drawerId
      )
      .subscribe((transactions) => {
        this.creditTransactionSummery = {
          groups: [],
          total: 0,
          type: TransactionType.CREDIT,
        };
        this.debitTransactionSummery = {
          groups: [],
          total: 0,
          type: TransactionType.DEBIT,
        };

        transactions.forEach((t) => {
          if (t.transactionType === TransactionType.DEBIT) {
            const [available] = this.debitTransactionSummery.groups.filter(
              (tg) => tg.subject === t.transactionSubject
            );
            if (available) {
              available.value += t.updatedAmount;
            } else {
              this.debitTransactionSummery.groups.push({
                name: transactionSubjectToString(
                  t.transactionSubject,
                  t.transactionType
                ),
                subject: t.transactionSubject,
                value: t.updatedAmount,
              });
            }
            // this.debitTransactionSummery.groups.push({
            //   name: transactionSubjectToString(
            //     t.transactionSubject,
            //     t.transactionType
            //   ),
            //   subject: t.transactionSubject,
            //   value: t.updatedAmount,
            // });
          } else {
            const [available] = this.creditTransactionSummery.groups.filter(
              (tg) => tg.subject === t.transactionSubject
            );
            if (available) {
              available.value += t.updatedAmount;
            } else {
              this.creditTransactionSummery.groups.push({
                name: transactionSubjectToString(
                  t.transactionSubject,
                  t.transactionType
                ),
                subject: t.transactionSubject,
                value: t.updatedAmount,
              });
            }
            // this.creditTransactionSummery.groups.push({
            //   name: transactionSubjectToString(
            //     t.transactionSubject,
            //     t.transactionType
            //   ),
            //   subject: t.transactionSubject,
            //   value: t.updatedAmount,
            // });
          }
        });

        this.creditTransactionSummery.total =
          this.creditTransactionSummery.groups.reduce(
            (sum, current) => sum + current.value,
            0
          );
        this.debitTransactionSummery.total =
          this.debitTransactionSummery.groups.reduce(
            (sum, current) => sum + current.value,
            0
          );
      });
  }

  fillPrintTemplateData() {
    this.printTamplateData = {
      userName: this.user.displayName || "",
      loginTime: this.loginTime,
      logoutTime: this.logoutTime,
      ConfirmedAppointments: this.ConfirmedAppointments,
      drawerNo: +this.drawerNo,
      systemBalance: this.systemBalance,
      toNextCashier: this.toNextCashier,
      cashInHand: this.cashInHand,
      debitTransactionSummery: this.debitTransactionSummery,
      creditTransactionSummery: this.creditTransactionSummery,
    };
  }

  onConfirm() {
    this.isConfirmed = true;
    this.logout();
  }

  logout() {
    this.spinner.show();
    this.authService
      .updateUserLoginState({
        isLogin: false,
        uid: this.user.uid,
        drawerId: this.user.currentDrawerId,
      })
      .subscribe(() => {
        this.spinner.hide();
        this.authService.signOut();
        this.logoutTime = new Date();
        this.fillPrintTemplateData();
      });
  }

  print() {
    let element = document.getElementById("cash-balance-print");
    this.printingService.print(element);
  }

  close() {
    this.activeModal.close();
  }
}

const transactionSubjectToString = (
  subject: TransactionSubject,
  type: TransactionType = TransactionType.DEBIT
) => {
  switch (subject) {
    case TransactionSubject.BOOKING_PAYMENT:
      return "Confirmed Cash Payment Appointments";
    case TransactionSubject.BOOKING_REFUND:
      return "Sales Refund Made";
    case TransactionSubject.DOCTOR_PAYMENT:
      return "Doctor Payments Made";
    case TransactionSubject.DRAWER_TRANSFER:
      if ((type = TransactionType.CREDIT)) {
        return "Cash Transfered to Cashiers";
      } else {
        return "Cash Received from Cashiers";
      }

    default:
      return "Petty Cash Payments Made";
  }
};

export { transactionSubjectToString };
