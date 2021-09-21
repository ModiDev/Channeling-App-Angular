import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Transaction } from "../../commons/models/Transaction";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private afs: AngularFirestore) {}

  getAllTransactionsInThisSession(
    uid: string,
    lastLoginTime: Date,
    drawerId: string
  ) {
    return this.afs
      .collection("transactions", (ref) =>
        ref
          .where("updatedDrawerId", "==", drawerId)
          .where("createdBy", "==", uid)
          .where("createdAt", ">", lastLoginTime)
      )
      .get()
      .pipe(
        map((qsnap) => {
          return qsnap.docs.map((doc) => {
            return doc.data() as Transaction;
          });
        })
      );
  }
}
