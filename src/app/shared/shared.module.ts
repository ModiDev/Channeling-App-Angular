import {PrintTemplatesModule} from './print-templates/print-templates.module';
import {BookingFilterPipe} from './pipes/booking-filter/booking-filter.pipe';
import {UpcomingSessionFilterPipe} from './pipes/upcoming-session-group-filter/upcoming-session-filter.pipe';
import {ActionBarComponent} from "./components/action-bar/action-bar.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ActiveSessionCardViewComponent} from './components/active-session-card-view/active-session-card-view.component';
import {UpcomingSessionCardViewComponent} from './components/upcoming-session-card-view/upcoming-session-card-view.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {NgbModule, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormPopupComponent} from "./components/form-popup/form-popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {AppButtonsViewComponent} from "./components/app-buttons-view/app-buttons-view.component";
import {TimePickerComponent} from "./components/time-picker/time-picker.component";
import {ScrollableDirective} from './utils/scrollable.directive';
import {AddBookingButtonComponent} from './components/add-booking-button/add-booking-button.component';
import {ScrollTableComponent} from './components/scroll-table/scroll-table.component';
import {RouterModule} from "@angular/router";
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {MainUpcomingSessionCardComponent} from "./components/main-upcoming-session-card/main-upcoming-session-card.component";
import {AppointmentsTableComponent} from './components/appointments-table/appointments-table.component';
import {LoadingComponent} from './components/loading/loading.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppointmentsViewComponent} from './modals/appointments-view/appointments-view.component';
import {AddBookingModalComponent} from './modals/add-booking-modal/add-booking-modal.component';
import {AddSessionPopupComponent} from './modals/add-session-popup/add-session-popup.component';
import {LogsViewModalComponent} from './modals/logs-view-modal/logs-view-modal.component';
import {LogoutViewModalComponent} from './modals/logout-view-modal/logout-view-modal.component';
import {PaymentsFormModalComponent} from './modals/payments-form-modal/payments-form-modal.component';
import {AddDrawerModalComponent} from './modals/add-drawer-modal/add-drawer-modal.component';
import {AddDiscountModelComponent} from './modals/add-discount-model/add-discount-model.component';
import {AlertDialogBoxComponent} from "./components/alert-dialog-box/alert-dialog-box.component";
import {DrawerLogsModalComponent} from './modals/drawer-logs-modal/drawer-logs-modal.component';
import {BookingStatusPipe} from './pipes/booking-status/booking-status.pipe';
import {BookingsSortPipe} from './pipes/bookings-sort/bookings-sort.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    ActiveSessionCardViewComponent,
    AppButtonsViewComponent,
    UpcomingSessionCardViewComponent,
    SearchBarComponent,
    FormPopupComponent,
    TimePickerComponent,
    ScrollableDirective,
    AddBookingModalComponent,
    AddBookingButtonComponent,
    ScrollTableComponent,
    ActionBarComponent,
    MainUpcomingSessionCardComponent,
    DialogBoxComponent,
    UpcomingSessionFilterPipe,
    BookingFilterPipe,
    AppointmentsTableComponent,
    LoadingComponent,
    AddSessionPopupComponent,
    AppointmentsViewComponent,
    LogsViewModalComponent,
    LogoutViewModalComponent,
    PaymentsFormModalComponent,
    AddDrawerModalComponent,
    AddDiscountModelComponent,
    AlertDialogBoxComponent,
    DrawerLogsModalComponent,
    BookingStatusPipe,
    BookingsSortPipe,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule,
    NgxSpinnerModule,
    PrintTemplatesModule
  ],
  exports: [
    HeaderComponent,
    SideBarComponent,
    ActiveSessionCardViewComponent,
    AppButtonsViewComponent,
    UpcomingSessionCardViewComponent,
    SearchBarComponent,
    FormPopupComponent,
    NgbDatepickerModule,
    ScrollableDirective,
    NgxMaterialTimepickerModule,
    AddBookingButtonComponent,
    ActionBarComponent,
    AddBookingModalComponent,
    ScrollTableComponent,
    DialogBoxComponent,
    MainUpcomingSessionCardComponent,
    UpcomingSessionFilterPipe,
    BookingFilterPipe,
    AppointmentsTableComponent,
    NgxSpinnerModule,
    LoadingComponent,
    AddSessionPopupComponent,
    AppointmentsViewComponent,
    AlertDialogBoxComponent,
    BookingStatusPipe,
    BookingsSortPipe
  ],
})
export class SharedModule {
}
