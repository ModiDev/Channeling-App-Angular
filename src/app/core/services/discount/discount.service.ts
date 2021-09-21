import { DiscountTypeUpdateDTO } from '../../commons/dtos/DiscountTypeUpdateDTO';
import { DiscountTypeAddDTO } from '../../commons/dtos/DiscountTypeAddDTO';
import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {DiscountType} from '../../commons/models/DiscountType';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {


  constructor(private afs: AngularFirestore,private fns: AngularFireFunctions) {
  }

  getDiscountTypesCollection(): Observable<QuerySnapshot<DiscountType>> {
    return this.afs.collection<DiscountType>('discountTypes').get();
  }

  getDiscounts() {
    return this.afs.collection('discountTypes')
    .snapshotChanges() as Observable<DocumentChangeAction<DiscountType>[]>;
  }

  addDiscount(dto: DiscountTypeAddDTO): Observable<any> {
    const callable = this.fns.httpsCallable<DiscountTypeAddDTO>("addDiscountType");
    return callable(dto);
  }

  updateDiscount(dto: DiscountTypeUpdateDTO): Observable<any> {
    const callable = this.fns.httpsCallable<DiscountTypeUpdateDTO>("updateDiscountType");
    return callable(dto);
  }

  updateDiscountStatus(discountId: string): Observable<any> {
    const callable = this.fns.httpsCallable<String>("updateDiscountTypeStatus");
    return callable(discountId);
  }

}
