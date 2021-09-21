import {Injectable} from '@angular/core';
import {Specialty} from '../../commons/constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor() {
  }

  getSpecialtyValues(): string[] {
    return Object.values(Specialty);
  }
}
