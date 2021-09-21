import {Component, OnInit} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LogService} from 'src/app/core/services/log/log.service';
import {UserService} from 'src/app/core/services/user/user.service';
import {Booking} from 'src/app/core/commons/models/Booking';
import {Log} from 'src/app/core/commons/models/Log';
import {Session} from 'src/app/core/commons/models/Session';
import {UserFirestore} from 'src/app/core/commons/models/UserFirestore';

@Component({
  selector: 'app-logs-view-modal',
  templateUrl: './logs-view-modal.component.html',
  styleUrls: ['./logs-view-modal.component.scss']
})
export class LogsViewModalComponent implements OnInit {
  faTimes = faTimes;

  logs: Log[] = [];
  users!: UserFirestore[];
  id: string = "";
  modalTitle: string = "SESSION LOGS"
  session!: Session;
  booking!: Booking;

  constructor(
    private logService: LogService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
  ) {
    this.userService.getUserCollection().subscribe((snapshot) => {
      const tmpUsers = snapshot.docs.map((value) => {
        return value.data() as UserFirestore;
      });
      this.users = tmpUsers;
    });
  }

  ngOnInit(): void {
    if (this.session !== undefined && this.booking === undefined)
      this.id = this.session.id as string;
    else if (this.booking !== undefined) {
      this.id = this.booking.id as string;
      this.modalTitle = "APPOINTMENT LOGS"
    }

    this.logService.getLogsById(this.id).subscribe((snapshot) => {
      this.logs = snapshot as Log[];
    });

  }

  getUserName(uid: string): string {
    const user = this.users?.find((user) => user.uid === uid);
    return "" + user?.firstName + " " + user?.lastName;
  }

}
