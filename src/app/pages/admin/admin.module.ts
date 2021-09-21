import { PrintTemplatesModule } from './../../shared/print-templates/print-templates.module';
import { RouterModule } from '@angular/router';
import { AdminComponentsModule } from './../../shared/admin/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReportsComponent } from './reports/reports.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DrawersComponent } from './drawers/drawers.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    UsersComponent,
    EmployeesComponent,
    ReportsComponent,
    DiscountsComponent,
    DrawersComponent,
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AdminComponentsModule,
    FontAwesomeModule,
    RouterModule,
    PrintTemplatesModule
  ]
})
export class AdminModule { }
