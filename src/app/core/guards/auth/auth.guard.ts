import {Injectable, NgZone} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private zone: NgZone
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      await this.afAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          this.zone.run(() => {
            this.router.navigate(['/auth']);
          });
          resolve(false);
        }
      });
    });
  }

}
