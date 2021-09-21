import {Session} from "../../../core/commons/models/Session";
import {Component, OnInit} from "@angular/core";
import {SessionService} from "src/app/core/services/session/session.service";
import {ActiveStatus, Specialty} from "src/app/core/commons/constants/Constant";

export interface UpcomingSessionGroup {
  doctorId?: string;
  doctorName?: string;
  doctorSpec?: Specialty;
  doctorContact?: string;
  sessions: Session[];
}

@Component({
  selector: "app-upcoming-sessions",
  templateUrl: "./upcoming-sessions.component.html",
  styleUrls: ["./upcoming-sessions.component.scss"],
})
export class UpcomingSessionsComponent implements OnInit {
  searchText: string = "";
  searchType: ActiveStatus | "all" = "all";
  sessionGroups: UpcomingSessionGroup[] = [];
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getUpcomingSessions().subscribe((sessions) => {
      this.sessionGroups = [];
      (sessions as Session[]).forEach((session: Session) => {
        const [avs] = this.sessionGroups.filter(
          (sg) => sg.doctorId === session.doctorId
        );
        if (avs) {
          avs.sessions.push(session);
        } else {
          this.sessionGroups.push({
            doctorId: session.doctorId,
            doctorContact: session.doctor?.contact,
            doctorName: session.doctor?.name,
            doctorSpec: session.doctor?.specialty,
            sessions: [session],
          });
        }
      });
    });
  }

  onChangeSearchText(value: any) {
    this.searchText = value;
  }
  onChangeSearchType(value: any) {
    this.searchType = value;
  }
  onActionClick() { }
}
