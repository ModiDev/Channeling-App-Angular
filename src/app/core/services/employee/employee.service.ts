import {Injectable} from '@angular/core';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Employee} from '../../commons/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private afs: AngularFirestore) {
  }

  getEmployeesCollection(): Observable<QuerySnapshot<Employee>> {
    return this.afs.collection<Employee>('employees').get();
  }

}
