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

    const requiredPermissions: (Permission | Permission[])[] = next.data['permissions'];

    return new Promise(async (resolve) => {
      const localUser = await this.authService.refreshToken().toPromise();

      // Check if user is logged in
      if (!localUser) {
        resolve(this.router.createUrlTree(['/login']));
      }

      // Check if permissions match
      if (requiredPermissions && !this.authService.hasPermissions(requiredPermissions)) {
        resolve(false);
      }

      resolve(true);
    });
  }

}
