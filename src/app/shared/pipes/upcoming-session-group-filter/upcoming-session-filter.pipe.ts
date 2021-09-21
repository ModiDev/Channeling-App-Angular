import {Pipe, PipeTransform} from "@angular/core";
import {ActiveStatus} from "src/app/core/commons/constants/Constant";
import {Doctor} from "src/app/core/commons/models/Doctor";
import {UpcomingSessionGroup} from "src/app/pages/home/upcoming-sessions/upcoming-sessions.component";

@Pipe({
  name: "USGFilter",
})
export class UpcomingSessionFilterPipe implements PipeTransform {
  transform(
    sessions: UpcomingSessionGroup[],
    searchText: string
  ): UpcomingSessionGroup[] {
    if (searchText.trim().length <= 0) return sessions;
    return sessions.filter(
      (session) =>
        session.doctorName?.toLowerCase().includes(searchText.toLowerCase()) ||
        session.doctorSpec?.toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }
}
