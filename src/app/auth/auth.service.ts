import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '../core/api/api.service';
import { User } from '../models/user';
import { LocalUser } from './../models/localUser';
import { Permission } from './../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  private localUserChange: BehaviorSubject<LocalUser>;
  public onLocalUserChange: Observable<LocalUser>;

  constructor(
    private api: ApiService
    ) {
      this.localUserChange = new BehaviorSubject(this.getLocalUser());
      this.onLocalUserChange = this.localUserChange.asObservable();
  }

  private get accessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    const accessToken = this.accessToken;

    if (accessToken) {
      return !this.jwtHelper.isTokenExpired(this.accessToken);
    }
    return false;
  }

  login(username: string, password: string): Promise<boolean> {
    return this.api.post<{ access_token: string, refresh_token: string, user: User }>('auth/login', {
      username,
      password
    }).pipe(
      map((result) => {

        localStorage.setItem('access_token', result.access_token);
        this.api.setToken(result.access_token);
        this.localUserChange.next(this.getLocalUser());

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }

  logout() {
    localStorage.removeItem('access_token');
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
}
