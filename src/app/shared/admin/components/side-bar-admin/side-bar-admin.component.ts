import { Component, OnInit } from '@angular/core';
import { faStethoscope,faUserFriends,faUser,faFileAlt,faPercentage,faTv, faMoneyCheck, faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.scss']
})
export class SideBarAdminComponent implements OnInit {

  iconDoctor = faStethoscope;
  iconUsers = faUser;
  iconEmployees = faUserFriends;
  iconReports = faFileAlt;
  iconDiscount = faMoneyCheckAlt;
  iconDrawer = faTv;

  constructor() { }

  ngOnInit(): void {
  }

}
