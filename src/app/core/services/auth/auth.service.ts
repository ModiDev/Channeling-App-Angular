import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import { AngularFireFunctions } from "@angular/fire/functions";
import auth from "firebase/app";
import { UserLoginStateUpdateDTO } from "../../commons/dtos/UserLoginUpdateDTO";

@Injectable()
export class AuthService {

  constructor(private afa: AngularFireAuth,private fns: AngularFireFunctions) {
  }

  signIn(username: string, password: string): Promise<auth.auth.UserCredential> {
    const email = username + "@slh.lk";
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  async signOut(): Promise<void> {
    await this.afa.signOut();
  }

  getCurrentUser(): Promise<auth.User | null> {
    return this.afa.currentUser;
  }

  updateUserLoginState(dto:UserLoginStateUpdateDTO){
    const callable = this.fns.httpsCallable<UserLoginStateUpdateDTO>("updateUserLoginState");
    return callable(dto);
  }
}
