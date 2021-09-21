import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActiveSessionsComponent} from './active-sessions/active-sessions.component';
import {AppointmentsPageComponent} from './appointments-page/appointments-page.component';
import {DoctorPageComponent} from './doctor-page/doctor-page.component';
import {HomeComponent} from './home-page/home.component'
import {HomeRootComponent} from './home-root.component';
import {SessionHistoryComponent} from './session-history/session-history.component';
import {UpcomingSessionsComponent} from './upcoming-sessions/upcoming-sessions.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'active',
        component: ActiveSessionsComponent,
      },
      {
        path: 'upcoming',
        component: UpcomingSessionsComponent,
      },
      {
        path: 'history/:id',
        component: SessionHistoryComponent,
      },
      {
        path: 'doctor/:id',
        component: DoctorPageComponent,
      },
      {
        path: 'doctor/:id/:sessionId',
        component: DoctorPageComponent,
      },
      {
        path: 'appointments',
        component: AppointmentsPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static components = [
    HomeRootComponent,
    HomeComponent,
    ActiveSessionsComponent,
    UpcomingSessionsComponent,
    SessionHistoryComponent,
    DoctorPageComponent,
    AppointmentsPageComponent
  ];
}
