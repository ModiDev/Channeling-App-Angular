import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Doctor} from "../../commons/models/Doctor";
import {CreateDoctorDTO} from "../../commons/dtos/CreateDoctorDTO";
import {AngularFireFunctions} from "@angular/fire/functions";
import {UpdateDoctorDTO} from "../../commons/dtos/UpdateDoctorDTO";
import {UpdateDoctorStatusDTO} from "../../commons/dtos/UpdateDoctorStatusDTO";
import { AngularFireStorage } from '@angular/fire/storage';
import {ActiveStatus} from "../../commons/constants/Constant";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private afs: AngularFirestore, private fns: AngularFireFunctions,private afStorage:AngularFireStorage) {
  }

  updateDoctorStatus(updateDoctorStatusDTO: UpdateDoctorStatusDTO): Observable<any> {
    const callable = this.fns.httpsCallable<UpdateDoctorStatusDTO>('updateDoctorStatus');
    return callable(updateDoctorStatusDTO);
  }

  getDoctorCollection(): Observable<DocumentChangeAction<Doctor>[]> {
    return this.afs.collection('doctors')
      .snapshotChanges() as Observable<DocumentChangeAction<Doctor>[]>;
  }

  getActiveDoctors(): Observable<DocumentChangeAction<Doctor>[]> {
    return this.afs.collection('doctors', (ref) => ref.where("status", "==", ActiveStatus.ACTIVE))
      .snapshotChanges() as Observable<DocumentChangeAction<Doctor>[]>;
  }

  getSingleDoctor(doctorId: string) {
    return this.afs.collection("doctors").doc(doctorId);
  }

  getDoctorForHistoryRoute(): Observable<Doctor | undefined> {
    return this.afs.collection(
      "doctors", ref => ref.limit(1))
      .get()
      .pipe(
        map(snapshot => {
          if (snapshot.size > 0) {
            const doc = snapshot.docs[0];
            return {
              ...doc.data() as Doctor,
              id: doc.id
            }
          }

          return undefined;
        })
      );
  }

  uploadDoctorImage(image:File){
    return this.afStorage.upload(`doctorImages/${image.name}`,image);
  }

  addDoctor(createDoctorDTO: CreateDoctorDTO) {
    const callable = this.fns.httpsCallable('createDoctor');
    return callable({
      ...createDoctorDTO,
    });
  }

  updateDoctor(updateDoctorDTO: UpdateDoctorDTO) {
    const callable = this.fns.httpsCallable('updateDoctor');
    return callable({
        ...updateDoctorDTO,
      }
    );
  }
}
