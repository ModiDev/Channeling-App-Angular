import {Component, Input, OnInit} from '@angular/core';
import {faCashRegister, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {Session} from 'src/app/core/commons/models/Session';
@Component({
  selector: 'app-upcoming-session-card-view',
  templateUrl: './upcoming-session-card-view.component.html',
  styleUrls: ['./upcoming-session-card-view.component.scss']
})
export class UpcomingSessionCardViewComponent implements OnInit {
  fauser = faUser;
  faplus = faPlus;
  faCashRegister = faCashRegister;

  @Input() session!: Session;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  }
}
