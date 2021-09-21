import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarAdminComponent } from './components/side-bar-admin/side-bar-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ViewDoctorCardComponent } from './components/view-doctor-card/view-doctor-card.component';
import { AdminActionBarComponent } from './components/admin-action-bar/admin-action-bar.component';
import { DoctorFilterPipe } from './pipes/doctor-filter/doctor-filter.pipe';
import { DrawerFilterPipe } from './pipes/drawer-filter/drawer-filter.pipe';
import { DiscountFilterPipe } from './pipes/discount-filter/discount-filter.pipe';




@NgModule({
  declarations: [
    SideBarAdminComponent,
    ViewDoctorCardComponent,
    AdminActionBarComponent,
    DoctorFilterPipe,
    DrawerFilterPipe,
    DiscountFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    SideBarAdminComponent,
    ViewDoctorCardComponent,
    AdminActionBarComponent,
    DoctorFilterPipe,
    DrawerFilterPipe,
    DiscountFilterPipe
  ]
})
export class AdminComponentsModule { }
