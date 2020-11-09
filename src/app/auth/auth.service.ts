import { UsersService } from 'src/app/core/users/users.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = 'http://localhost:3000/v0/auth';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private accessToken: string;
  private refreshToken: string;

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    ) {
    this.refreshToken = localStorage.getItem('refresh_token');

    /*if (this.refreshToken && this.jwtHelper.isTokenExpired(this.refreshToken)) {
      this.http.post(this.endpoint + '/token', {
        refresh_token: this.refreshToken
      }, {
        headers: this.headers
      }).subscribe((result) => {
        this.accessToken = result['access_token'];
      });
    }*/
  }

  getToken() {
    //return this.accessToken;
    return null;
  }

  isLoggedIn(): boolean {
    //return this.accessToken !== null;
    return sessionStorage.getItem('currentUser') !== null;
  }

  login(username: string, password: string): Promise<boolean> {
    /*return this.http.post<{ access_token: string, refresh_token: string, user: User }>(this.endpoint + '/login', {
      username,
      password
    }, {
      headers: this.headers
    }).pipe(
      map((result) => {
        this.accessToken = result.access_token;
        localStorage.setItem('refresh_token', result.refresh_token);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();*/
    let user = this.usersService.getByUserName(username);

    console.log(user);

    if (!user) {
      return of(false).toPromise();
    }

    sessionStorage.setItem('currentUser', user.id);
    return of(true).toPromise();
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }

  getCurrentUserId() {
    return sessionStorage.getItem('currentUser');
  }
}
