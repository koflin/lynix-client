import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Permission } from '../models/role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredPermissions: Permission[] = next.data['permissions'];
    const localUser = this.authService.getLocalUser();

    // Check if user is logged in
    if (!localUser) {
      return this.router.createUrlTree(['/login']);
    }

    // Check if permissions match
    if (requiredPermissions && !this.authService.hasPermissions(...requiredPermissions)) {
      return false;
    }

    return true;
  }

}
