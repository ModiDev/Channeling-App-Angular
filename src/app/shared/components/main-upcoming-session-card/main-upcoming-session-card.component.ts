import { Component, Input, OnInit } from '@angular/core';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { Session } from 'src/app/core/commons/models/Session';


@Component({
  selector: 'app-main-upcoming-session-card',
  templateUrl: './main-upcoming-session-card.component.html',
  styleUrls: ['./main-upcoming-session-card.component.scss']
})
export class MainUpcomingSessionCardComponent implements OnInit {
  fauser = faUser;

  doctorRoute: string = "/dashboard/doctor"

  @Input() session!: Session;

  constructor() {

  }

  ngOnInit(): void {
  }

}
