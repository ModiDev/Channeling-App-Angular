import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  faCross = faTimes;

  description: string = "";
  title: string = "ARE YOU SURE?";

  @Output() onPressEvent = new EventEmitter<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  onPress(value: boolean) {
    this.onPressEvent.emit(value);
    this.activeModal.close("");
  }
}
