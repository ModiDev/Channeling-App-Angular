import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {faCashRegister, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Session} from 'src/app/core/commons/models/Session';
@Component({
  selector: 'app-active-session-card-view',
  templateUrl: './active-session-card-view.component.html',
  styleUrls: ['./active-session-card-view.component.scss'],
})
export class ActiveSessionCardViewComponent implements OnInit, OnChanges {
  fauser = faUser;
  faplus = faPlus;
  faCashRegister = faCashRegister;

  isSelected: boolean = false;

  @Output() onSelectedEvent = new EventEmitter<Session>();

  @Input() session!: Session;

  @Input() isGloballySelected!: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.isSelected = this.isGloballySelected;
  }

  onClick(e: any) {
    e.stopPropagation();
    this.onSelectedEvent.emit(this.session);
  }

}
