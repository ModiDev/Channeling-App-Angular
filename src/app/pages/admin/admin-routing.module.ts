import { DoctorsComponent } from './doctors/doctors.component';
import { DrawersComponent } from './drawers/drawers.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { ReportsComponent } from './reports/reports.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "doctors",
        component: DoctorsComponent,
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "employees",
        component: EmployeesComponent,
      },
      {
        path: "reports",
        component: ReportsComponent,
      },
      {
        path: "discounts",
        component: DiscountsComponent,
      },
      {
        path: "drawers",
        component: DrawersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
