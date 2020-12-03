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

  private jwtHelper = new JwtHelperService();

  private loggedInUserChange: BehaviorSubject<User>;
  public onLoggedInUserChange: Observable<User>;

  constructor(
    private http: HttpClient,
    ) {

      if (this.isLoggedIn()) {
        const user = this.jwtHelper.decodeToken(this.accessToken).user;

        this.loggedInUserChange = new BehaviorSubject(user);
      } else {
        this.loggedInUserChange = new BehaviorSubject(null);
      }

      this.onLoggedInUserChange = this.loggedInUserChange.asObservable();
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
    return this.http.post<{ access_token: string, refresh_token: string, user: User }>(this.endpoint + '/login', {
      username,
      password
    }, {
      headers: this.headers
    }).pipe(
      map((result) => {

        localStorage.setItem('access_token', result.access_token);
        const user = this.jwtHelper.decodeToken(result.access_token).user;

        this.loggedInUserChange.next(user);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedInUserChange.next(null);
  }

  // Only temporarily like this
  getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const user = this.jwtHelper.decodeToken(this.accessToken).user;

      return user;
    }

    return null;
  }
}
