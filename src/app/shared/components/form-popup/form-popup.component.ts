import {Component, Input, OnInit} from '@angular/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faCalendar, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss'],

})
export class FormPopupComponent implements OnInit {
  confirm_button:string = 'CONFIRM';

  faCross = faTimes;
  faDatePicker = faCalendar;
  faTimePicker = faClock;

  model: NgbDateStruct | any;



  constructor() {
  }

  ngOnInit(): void {
  }

}
