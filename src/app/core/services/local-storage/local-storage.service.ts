import { Session } from "../../commons/models/Session";
import { Booking } from "../../commons/models/Booking";
import { Injectable } from "@angular/core";
import { Drawer } from "../../commons/models/Drawer";

interface LastReciptData {
  booking: Booking;
  session: Session;
}
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private LAST_RECEIPT_KEY = "last-recept-data";
  private CURRENT_DRAWER = "current-drawer";
  constructor() {}

  saveCurrentDrawer(drawer: Drawer) {
    if (drawer.id) localStorage.setItem(this.CURRENT_DRAWER, drawer.id);
  }

  getCurrentDrawerId() {
    const ds = localStorage.getItem(this.CURRENT_DRAWER);
    if (ds) {
      return ds;
    } else {
      return null;
    }
  }

  saveLastRecipt(data: LastReciptData) {
    localStorage.setItem(this.LAST_RECEIPT_KEY, JSON.stringify(data));
  }

  getLastRecipt() {
    const data = localStorage.getItem(this.LAST_RECEIPT_KEY);
    if (data) {
      const x = JSON.parse(data) as LastReciptData;
      return {
        ...x,
        session: {
          ...x.session,
          startsAt: new Date(x.session.startsAt),
          endsAt: new Date(x.session.endsAt),
          sessionDate: new Date(x.session.sessionDate),
        },
        booking: {
          ...x.booking,
          sessionStartsAt: new Date(x.booking.sessionStartsAt),
          sessionEndsAt: new Date(x.booking.sessionEndsAt),
          sessionDate: new Date(x.booking.sessionDate),
        },
      };
    } else {
      return null;
    }
  }

  clearLastRecipt() {
    localStorage.removeItem(this.LAST_RECEIPT_KEY);
  }
}
