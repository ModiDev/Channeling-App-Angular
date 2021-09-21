import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {faCashRegister, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Session} from 'src/app/core/commons/models/Session';

@Component({
  selector: 'app-session-history-card',
  templateUrl: './session-history-card.component.html',
  styleUrls: ['./session-history-card.component.scss']
})
export class SessionHistoryCardComponent implements OnInit, OnChanges {

  fauser = faUser;
  faplus = faPlus;
  faCashRegister = faCashRegister;

  isSelected: boolean = false;

  @Output() onSelectedEvent = new EventEmitter<Session>();

  @Input() session!: Session;

  @Input() isGloballySelected!: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnChanges(): void {
    this.isSelected = this.isGloballySelected;
  }

  ngOnInit(): void { }

  onClick(e: any) {
    this.onSelectedEvent.emit(this.session);
  }

}
