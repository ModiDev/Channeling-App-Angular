import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireFunctions} from "@angular/fire/functions";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BookingCancelDTO} from "../../commons/dtos/BookingCancelDTO";
import {BookingRefundDTO} from "../../commons/dtos/BookingRefundDTO";
import {BookingTemplateCreateDTO} from "../../commons/dtos/BookingTemplateCreateDTO";
import {CreateBookingDTO} from "../../commons/dtos/CreateBookingDTO";
import {UpdateBookingDTO} from "../../commons/dtos/UpdateBookingDTO";
import {Booking} from "../../commons/models/Booking";
import {BookingStatus} from '../../commons/constants/Constant';
import {BookingPayment} from "../../commons/models/BookingPayment";
import {BookingTemplate} from "../../commons/models/BookingTemplate";
import AppointmentsGetDTO from "../../commons/dtos/AppointmentsGetDTO";
import {BookingPatientConfirmationDTO} from "../../commons/dtos/BookingPatientConfirmationDTO";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) { }

  getBookingCollection(): Observable<Booking[] | unknown[]> {
    return this.afs
      .collection("bookings")
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions
            .map((a) => {
              let data = a.payload.doc.data() as Booking;
              const startAt = data.sessionStartsAt as any;
              data = {...data, sessionStartsAt: startAt?.toDate()};
              return {
                id: a.payload.doc.id,
                ...data,
              };
            })
            .sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return a.createdAt > b.createdAt
                  ? 1
                  : b.createdAt > a.createdAt
                    ? -1
                    : 0;
              }
              return 0;
            })
        )
      );
  }

  getBookingHistory(): Observable<Booking[] | unknown[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.afs
      .collection("bookings", (ref) => ref.where("sessionDate", "<=", today))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Booking;
            return {
              id: a.payload.doc.id,
              ...data,
            };
          })
        )
      );
  }

  getBookingsBySessionId(sessionId: string): Observable<Booking[] | unknown[]> {
    return this.afs
      .collection("bookings", (ref) => ref.where("sessionId", "==", sessionId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Booking;
            return {
              id: a.payload.doc.id,
              ...data,
            };
          })
        )
      );
  }

  getBookingTemplateById(id: string): Observable<BookingTemplate | undefined> {
    return this.afs
      .collection("bookingTemplates")
      .doc(id)
      .snapshotChanges()
      .pipe(
        map(
          (value) => {
            return value.payload.exists ? {
              ...value.payload.data() as BookingTemplate,
              id: value.payload.id,
            } : undefined;
          }
        )
      )
  }

  getBookingPaymentsBySessionId(sessionId: string): Observable<BookingPayment[] | unknown[]> {
    return this.afs
      .collection("bookingPayments", (ref) => ref.where("sessionId", "==", sessionId))
      .get()
      .pipe(
        map(
          (actions) => {
            return actions.docs.map((value) => {
              return value.data() as BookingPayment;
            })
          }
        )
      );
  }

  addBooking(createBookingDTO: CreateBookingDTO): Observable<any> {
    const callable = this.fns.httpsCallable<CreateBookingDTO>("createBooking");
    return callable(createBookingDTO);
  }
  getBookings(getAppointmentDTO: AppointmentsGetDTO): Observable<any> {
    const callable = this.fns.httpsCallable<AppointmentsGetDTO>("getAppointments");
    return callable(getAppointmentDTO);
  }

  updateBooking(updateBookingDTO: UpdateBookingDTO): Observable<any> {
    const callable = this.fns.httpsCallable<UpdateBookingDTO>("updateBooking");
    return callable(updateBookingDTO);
  }

  cancelBooking(bookingCancelDTO: BookingCancelDTO): Observable<any> {
    const callable = this.fns.httpsCallable<BookingCancelDTO>("cancelBooking");
    return callable(bookingCancelDTO);
  }

  createBookingTemplate(bookingTemplate: BookingTemplateCreateDTO) {
    const callable = this.fns.httpsCallable<BookingTemplateCreateDTO>(
      "createBookingTemplate"
    );
    return callable(bookingTemplate);
  }

  refundBooking(refundDTO: BookingRefundDTO): Observable<any> {
    const callable = this.fns.httpsCallable<BookingRefundDTO>("refundBooking");
    return callable(refundDTO);
  }

  updatePatientConfirmation(updatePatientConfirmationDTO: BookingPatientConfirmationDTO): Observable<any> {
    const callable = this.fns.httpsCallable<BookingPatientConfirmationDTO>("updatePatientConfirmation");
    return callable(updatePatientConfirmationDTO);
  }

  getBookingsByUserSession(createdBy: string, loginTime: Date): Observable<Booking[]> {
    return this.afs.collection("bookings", ref => ref
      .where("createdAt", ">=", loginTime)
      .where("createdBy", "==", createdBy)
      .where("bookingStatus", "==", BookingStatus.CONFIRMED)
    )
      .get().pipe(
        map(
          (a) => {
            return a.docs.map((value) => {
              const data = value.data() as Booking;
              return {
                ...data,
                id: value.id,
              }
            });
          }
        )
      );
  }
}
