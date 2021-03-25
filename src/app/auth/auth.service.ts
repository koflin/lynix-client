import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  private localUserChange: BehaviorSubject<LocalUser>;
  public onLocalUserChange: Observable<LocalUser>;

  constructor(
    private api: ApiService
    ) {
      this.localUserChange = new BehaviorSubject(null);
      this.onLocalUserChange = this.localUserChange.asObservable();

      const validUntil = localStorage.getItem('validUntil');

      if (validUntil && parseInt(validUntil) > Date.now()) {
        this.refreshToken().subscribe();
      }
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  isLoggedIn(): boolean {
    const accessToken = this.accessToken;

    if (accessToken) {
      return !this.jwtHelper.isTokenExpired(this.accessToken);
    }
    return false;
  }

  login(username: string, password: string): Promise<boolean> {
    return this.api.post<{ access_token: string, user: LocalUser, refresh_expiration: number }>('auth/login', {
      username,
      password
    }).pipe(
      map((result) => {
        alert('TEST');
        console.log('TEST');
        localStorage.setItem('validUntil', result.refresh_expiration.toString());
        this.setToken(result.access_token);
        this.scheduleRefresh();
        this.localUserChange.next(result.user);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }

  logout() {
    this.accessToken = null;
    localStorage.setItem('validUntil', '0');
    this.setToken(null);
    this.localUserChange.next(this.getLocalUser());
  }

  getLocalUser(): LocalUser {
    if (this.isLoggedIn()) {
      return this.jwtHelper.decodeToken(this.accessToken).user;
    }

    return null;
  }

  hasPermissions(...requiredPermissions: Permission[]) {

    const localUser = this.getLocalUser();

    if (requiredPermissions) {
      for (let permission of requiredPermissions) {
        if (!localUser.permissions.includes(permission)) {
          return false;
        }
      }
    }

    return true;
  }

  refreshToken() {
    return this.api.post<{ access_token: string, user: LocalUser, refresh_expiration: number }>('auth/token').pipe(
      tap((result) => {
        localStorage.setItem('validUntil', result.refresh_expiration.toString());
        this.setToken(result.access_token);
        this.scheduleRefresh();
        this.localUserChange.next(result.user);
      })
    );
  }

  private scheduleRefresh() {
    setTimeout(this.refreshToken, this.jwtHelper.getTokenExpirationDate(this.accessToken).getTime() - Date.now() - 30000);
  }
}
