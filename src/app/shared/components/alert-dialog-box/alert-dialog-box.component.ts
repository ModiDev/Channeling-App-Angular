import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-alert-dialog-box',
  templateUrl: './alert-dialog-box.component.html',
  styleUrls: ['./alert-dialog-box.component.scss']
})
export class AlertDialogBoxComponent implements OnInit {
  faCross = faTimes;
  alertTitle:string = "";
  alertDescription: string = "";

  @Output() onPressEvent = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onPressAlert(value: boolean) {
    this.onPressEvent.emit(value);
    this.activeModal.close("");
  }
}
