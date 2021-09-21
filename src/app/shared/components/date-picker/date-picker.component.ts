import { Component, OnInit } from '@angular/core';
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  model: NgbDateStruct | any;
  faDatePicker = faCalendar;
  constructor() { }

  ngOnInit(): void {
  }

}
