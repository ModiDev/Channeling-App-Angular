import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {DoctorPaymentDTO} from '../../commons/dtos/DoctorPaymentDTO';
import {DrawerTransferDTO} from '../../commons/dtos/DrawerTransferDTO';
import {OtherPaymentDTO} from '../../commons/dtos/OtherPaymentDTO';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
  ) { }

  drawerTransfer(drawerTransferDTO: DrawerTransferDTO) {
    const callable = this.fns.httpsCallable("drawerTransfer");
    return callable(drawerTransferDTO);
  }

  otherPayment(otherPayment: OtherPaymentDTO) {
    const callable = this.fns.httpsCallable("otherPayment");
    return callable(otherPayment);
  }

  doctorPayment(doctorPayment: DoctorPaymentDTO) {
    const callable = this.fns.httpsCallable("doctorPayment");
    return callable(doctorPayment);
  }
}
