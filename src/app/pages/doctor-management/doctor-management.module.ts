import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorManagementRoutingModule } from './doctor-management-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AddDoctorPaymentDetailsFormComponent } from './add-doctor-payment-details-form/add-doctor-payment-details-form.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDoctorFormComponent } from './add-doctor-form/add-doctor-form.component';
import {AddDoctorPersonalDetailsFormComponent} from "./add-doctor-personal-details-forms/add-doctor-personal-details-form.component";
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AddDoctorPaymentDetailsFormComponent,
    ViewDoctorComponent,
    AddDoctorPersonalDetailsFormComponent,
    AddDoctorFormComponent,
  ],
  imports: [
    CommonModule,
    DoctorManagementRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    ViewDoctorComponent,
    AddDoctorPersonalDetailsFormComponent,
    AddDoctorPaymentDetailsFormComponent,
    AddDoctorFormComponent,
  ]
})
export class DoctorManagementModule { }
