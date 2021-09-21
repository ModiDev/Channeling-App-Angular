import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Session} from "../../commons/models/Session";
import {AngularFireFunctions} from "@angular/fire/functions";
import {CreateSessionDTO} from "../../commons/dtos/CreateSessionDTO";
import {UpdateSessionDTO} from "../../commons/dtos/UpdateSessionDTO";
import {SessionStatus} from "../../commons/constants/Constant";

@Injectable()
export class SessionService {
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) { }

  getUpcomingSessions(): Observable<Session[] | unknown[]> {
    const today = new Date();
    return this.afs
      .collection("sessions", (ref) => ref.where("startsAt", ">", today))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions
            .filter(
              (s) =>
                (s.payload.doc.data() as Session).status !== SessionStatus.ENDED
            )
            .map((a) => {
              const data = a.payload.doc.data() as Session;
              let startsAt: any = data.startsAt;
              let endsAt: any = data.endsAt;
              let sessionDate: any = data.sessionDate;
              return {
                id: a.payload.doc.id,
                ...data,
                sessionDate: new Date(sessionDate?.seconds * 1000),
                startsAt: new Date(startsAt?.seconds * 1000),
                endsAt: new Date(endsAt?.seconds * 1000),
              };
            })
        )
      );
  }

  getTodaySessions(): Observable<Session[] | unknown[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.afs
      .collection("sessions", (ref) => ref.where("sessionDate", ">=", today))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Session;
            let startsAt: any = data.startsAt;
            let endsAt: any = data.endsAt;
            let sessionDate: any = data.sessionDate;
            return {
              id: a.payload.doc.id,
              ...data,
              sessionDate: new Date(sessionDate?.seconds * 1000),
              startsAt: new Date(startsAt?.seconds * 1000),
              endsAt: new Date(endsAt?.seconds * 1000),
            };
          }).sort((a, b) => (a.startsAt > b.startsAt) ? 1 : ((b.startsAt > a.startsAt) ? -1 : 0))
        )
      );
  }


  getUpcomingSessionsByDoctorId(
    doctorId: string
  ): Observable<Session[] | unknown[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.afs
      .collection("sessions", (ref) =>
        ref.where("doctorId", "==", doctorId).where("sessionDate", ">=", today)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Session;
            let startsAt: any = data.startsAt;
            let endsAt: any = data.endsAt;
            let sessionDate: any = data.sessionDate;
            return {
              ...data,
              id: a.payload.doc.id,
              sessionDate: new Date(sessionDate?.seconds * 1000),
              startsAt: new Date(startsAt?.seconds * 1000),
              endsAt: new Date(endsAt?.seconds * 1000),
            };
          })
        )
      );
  }

  getSessionHistoryByDoctorId(
    doctorId: string
  ): Observable<Session[] | unknown[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.afs
      .collection("sessions", (ref) =>
        ref
          .orderBy("sessionDate", "desc")
          .where("doctorId", "==", doctorId)
          .where("sessionDate", "<", today)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Session;
            let startsAt: any = data.startsAt;
            let endsAt: any = data.endsAt;
            let sessionDate: any = data.sessionDate;
            return {
              id: a.payload.doc.id,
              ...data,
              sessionDate: new Date(sessionDate?.seconds * 1000),
              startsAt: new Date(startsAt?.seconds * 1000),
              endsAt: new Date(endsAt?.seconds * 1000),
            };
          })
        )
      );
  }

  addSession(session: CreateSessionDTO) {
    const callable = this.fns.httpsCallable("createSession");
    return callable({
      ...session,
      startsAt: session.startsAt.toString(),
      endsAt: session.endsAt.toString(),
      sessionDate: session.sessionDate.toString(),
    });
  }

  updateSession(session: UpdateSessionDTO) {
    const callable = this.fns.httpsCallable("updateSession");
    return callable({
      ...session,
      startsAt: session.startsAt.toString(),
      endsAt: session.endsAt.toString(),
      sessionDate: session.sessionDate.toString(),
    });
  }

  endSession(sessionId: string) {
    const callable = this.fns.httpsCallable("endSession");
    return callable({sessionId: sessionId});
  }
}
