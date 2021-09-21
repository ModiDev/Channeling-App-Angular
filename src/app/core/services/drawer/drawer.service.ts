import { ActiveStatus } from "./../../commons/constants/Constant";
import { DrawerStatusUpdateDTO } from "../../commons/dtos/DrawerStatusUpdateDTO";
import { DrawerUpdateDTO } from "../../commons/dtos/DrawerUpdateDTO";
import { DrawerAddDTO } from "../../commons/dtos/DrawerAddDTO";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot,
} from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";
import { Observable } from "rxjs";
import { Drawer } from "../../commons/models/Drawer";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DrawerService {
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  getDrawerCollection(): Observable<DocumentChangeAction<Drawer>[]> {
    return this.afs
      .collection("drawers", (ref) =>
        ref.where("status", "==", ActiveStatus.ACTIVE)
      )
      .snapshotChanges() as Observable<DocumentChangeAction<Drawer>[]>;
  }
  getDrawerById(uid: string): Observable<Drawer> {
    return this.afs
      .collection<Drawer>("drawers")
      .doc(uid)
      .get()
      .pipe(
        map((a) => {
          const drawer = a.data() as Drawer;
          return { ...drawer, id: a.id };
        })
      );
  }

  addDrawer(dto: DrawerAddDTO): Observable<any> {
    const callable = this.fns.httpsCallable<DrawerAddDTO>("addDrawer");
    return callable(dto);
  }

  updateDrawer(dto: DrawerUpdateDTO): Observable<any> {
    const callable = this.fns.httpsCallable<DrawerUpdateDTO>("updateDrawer");
    return callable(dto);
  }

  updateDrawerState(dto: DrawerStatusUpdateDTO): Observable<any> {
    const callable =
      this.fns.httpsCallable<DrawerStatusUpdateDTO>("updateDrawerStatus");
    return callable(dto);
  }
}
