import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReceiptTemplateComponent} from './receipt-template/receipt-template.component';
import {CashBalanceTemplateComponent} from './cash-balance-template/cash-balance-template.component';
import {NgxPrintModule} from 'ngx-print';
import {DoctorPaymentTemplateComponent} from './doctor-payment-template/doctor-payment-template.component';



@NgModule({
  declarations: [
    ReceiptTemplateComponent,
    CashBalanceTemplateComponent,
    DoctorPaymentTemplateComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule
  ],
  exports: [
    ReceiptTemplateComponent,
    CashBalanceTemplateComponent,
    DoctorPaymentTemplateComponent
  ]
})
export class PrintTemplatesModule { }
