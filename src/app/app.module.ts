import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthService} from "./core/services/auth/auth.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {HttpClientModule} from "@angular/common/http";
import {SessionService} from './core/services/session/session.service';
import {DoctorService} from './core/services/doctor/doctor.service';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {EmployeeService} from './core/services/employee/employee.service';
import {DiscountService} from './core/services/discount/discount.service';
import {NotificationService} from "./core/services/notification/notification.service";
import {ToastrModule} from "ngx-toastr";
import {LogService} from './core/services/log/log.service';
import {UserService} from './core/services/user/user.service';
import {PaymentService} from './core/services/payment/payment.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports fire
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireFunctionsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    SessionService,
    DoctorService,
    EmployeeService,
    DiscountService,
    NotificationService,
    LogService,
    UserService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
