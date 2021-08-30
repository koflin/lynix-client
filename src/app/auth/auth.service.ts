import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ApiService } from '../core/api/api.service';
import { LocalUser } from './../models/localUser';
import { Permission } from './../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  private accessToken: string;

  private localUser: BehaviorSubject<LocalUser>;
  public onLocalUserChange: Observable<LocalUser>;

  constructor(
    private readonly api: ApiService,
    private cookies: CookieService
    ) {
      this.localUser = new BehaviorSubject(null);
      this.onLocalUserChange = this.localUser.asObservable();
  }

  getToken() {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    const validUntil = this.getLoggedInUntil();
    return validUntil ? parseInt(validUntil) > Date.now() : false;
  }

  login(email: string, password: string, persist: boolean): Promise<boolean> {
    return this.api.post<{ access_token: string, account: LocalUser, refresh_expiration: number }>('auth/login', {
      email,
      password,
      persist
    }).pipe(
      map((result) => {
        this.accessToken = result.access_token;
        this.scheduleRefresh();
        this.localUser.next(result.account);

        this.setLoggedInUntil(result.refresh_expiration, persist);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }

  logout() {
    return this.api.delete('auth/logout').pipe(
      map(() => {
        this.accessToken = null;
        this.clearLoggedInUntil();
        this.localUser.next(null);
        return;
      })
    ).toPromise();
  }

  getLocalUser(): LocalUser {
    if (this.isLoggedIn()) {
      return this.localUser.value;
    }

    return null;
  }

  hasPermissions(...requiredPermissions: (Permission | Permission[])[]) {

    const localUser = this.localUser.value;

    if (!localUser) {
      return false;
    }

    if (!requiredPermissions) {
      return true;
    }

    return requiredPermissions.some((permission) => {
      if (Array.isArray(permission)) {
        return permission.every(p => localUser.permissions.includes(p));
      }

      return localUser.permissions.includes(permission);
    });
  }

  refreshToken(): Observable<LocalUser> {
    const validUntil = this.getLoggedInUntil();

    if (validUntil && parseInt(validUntil) > Date.now()) {
      return this.api.post<{ access_token: string, account: LocalUser, refresh_expiration: number, persist: boolean }>('auth/token').pipe(
        tap((result) => {
          this.accessToken = result.access_token;
          this.scheduleRefresh();
          this.localUser.next(result.account);

          this.setLoggedInUntil(result.refresh_expiration, result.persist);
        }),
        map((result) => {
          return result.account;
        })
      );
    }
    return of(null);
  }

  private scheduleRefresh() {
    setTimeout(this.refreshToken.bind(this), this.jwtHelper.getTokenExpirationDate(this.accessToken).getTime() - Date.now() - 30000);
  }

  private getLoggedInUntil() {
    const validUntil = localStorage.getItem('logged_in_until');

    if (!validUntil) {
      return sessionStorage.getItem('logged_in_until');
    }

    return validUntil;
  }

  private setLoggedInUntil(value: number, persist: boolean) {
    if (persist) {
      localStorage.setItem('logged_in_until', value.toString());
      sessionStorage.removeItem('logged_in_until');
    } else {
      sessionStorage.setItem('logged_in_until', value.toString());
      localStorage.removeItem('logged_in_until');
    }
  }

  private clearLoggedInUntil() {
    localStorage.removeItem('logged_in_until');
      sessionStorage.removeItem('logged_in_until');
  }
}
