import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {faCashRegister, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Session} from 'src/app/core/commons/models/Session';

@Component({
  selector: 'app-session-card-doctor',
  templateUrl: './session-card-doctor.component.html',
  styleUrls: ['./session-card-doctor.component.scss']
})
export class SessionCardDoctorComponent implements OnInit, OnChanges {

  fauser = faUser;
  faplus = faPlus;
  faCashRegister = faCashRegister;

  isSelected: boolean = false;

  @Output() onSelectedEvent = new EventEmitter<Session>();

  @Input() session!: Session;

  @Input() isGloballySelected!: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.isSelected = this.isGloballySelected;
  }

  onClick(e: any) {
    this.onSelectedEvent.emit(this.session);
  }

}
