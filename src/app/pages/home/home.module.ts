import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DoctorManagementModule} from "../doctor-management/doctor-management.module";
import {SessionCardDoctorComponent} from './doctor-page/session-card-doctor/session-card-doctor.component';
import {SessionHistoryCardComponent} from './session-history/session-history-card/session-history-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ...HomeRoutingModule.components,
    SessionCardDoctorComponent,
    SessionHistoryCardComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FontAwesomeModule,
    DoctorManagementModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class HomeModule {
}
