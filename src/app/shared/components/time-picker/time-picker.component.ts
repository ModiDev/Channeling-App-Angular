import { Component, OnInit } from '@angular/core';
import {faClock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  faTimePicker = faClock;
  constructor() { }

  ngOnInit(): void {
  }

}
