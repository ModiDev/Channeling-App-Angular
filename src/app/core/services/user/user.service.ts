import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserFirestore} from '../../commons/models/UserFirestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
  }

  getUserCollection(): Observable<QuerySnapshot<UserFirestore>> {
    return this.afs.collection<UserFirestore>('users').get();
  }

  getUserByUid(uid: string): Observable<UserFirestore> {
    return this.afs.collection<UserFirestore>('users', ref =>
      ref.where("uid", "==", uid).limit(1))
      .get().pipe(
        map((a) => {
          return a.docs[0].data() as UserFirestore;
        })
      );
  }
}
