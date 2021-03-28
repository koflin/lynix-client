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
    return parseInt(this.cookies.get('logged_in_until')) > Date.now();
  }

  login(username: string, password: string): Promise<boolean> {
    return this.api.post<{ access_token: string, user: LocalUser, refresh_expiration: number }>('auth/login', {
      username,
      password
    }).pipe(
      map((result) => {
        this.accessToken = result.access_token;
        this.scheduleRefresh();
        this.localUser.next(result.user);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }

  logout() {
    this.accessToken = null;
    this.cookies.put('logged_in_until', '0');
    this.localUser.next(null);
  }

  getLocalUser(): LocalUser {
    if (this.isLoggedIn()) {
      return this.localUser.value;
    }

    return null;
  }

  hasPermissions(...requiredPermissions: Permission[]) {

    const localUser = this.localUser.value;

    if (!localUser) {
      return false;
    }

    if (requiredPermissions) {
      for (let permission of requiredPermissions) {
        if (!localUser.permissions.includes(permission)) {
          return false;
        }
      }
    }

    return true;
  }

  refreshToken(): Observable<LocalUser> {
    const validUntil = this.cookies.get('logged_in_until');

    if (validUntil && parseInt(validUntil) > Date.now()) {
      return this.api.post<{ access_token: string, user: LocalUser, refresh_expiration: number }>('auth/token').pipe(
        tap((result) => {
          this.accessToken = result.access_token;
          this.scheduleRefresh();
          this.localUser.next(result.user);
        }),
        map((result) => {
          return result.user;
        })
      );
    }

    return of(null);
  }

  private scheduleRefresh() {
    setTimeout(this.refreshToken.bind(this), this.jwtHelper.getTokenExpirationDate(this.accessToken).getTime() - Date.now() - 30000);
  }
}
