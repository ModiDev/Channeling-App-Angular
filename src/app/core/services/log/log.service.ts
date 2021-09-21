import {Injectable} from '@angular/core';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Log} from '../../commons/models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private afs: AngularFirestore) {
  }

  getLogsCollection(): Observable<QuerySnapshot<Log>> {
    return this.afs.collection<Log>('logs').get();
  }

  getLogsById(id: string): Observable<Log[] | unknown[]> {
    return this.afs.collection("logs", ref => ref.where('subjectId', '==', id))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Log;
          let createdAt: any = data.createdAt;
          return {
            ...data,
            id: a.payload.doc.id,
            createdAt: new Date(createdAt?.seconds * 1000),
          };
        }))
      );
  }
}


