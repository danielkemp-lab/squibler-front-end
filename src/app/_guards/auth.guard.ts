import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) { }

  public canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (localStorage.getItem('token')) {
      if (localStorage.token !== 'undefined')
        return true;
      else return false;
    }
    return false;
  }
}
