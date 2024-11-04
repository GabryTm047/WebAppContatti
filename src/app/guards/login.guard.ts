import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export const loginGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'any'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this._auth.loggedIn$.value ? true : this.goToLogin();
  }

  goToLogin() {
    this._router.navigate(['/login']);
    return false;
  }
}

