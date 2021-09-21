import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faAngleRight = faAngleDoubleRight;
  showSideBar: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
