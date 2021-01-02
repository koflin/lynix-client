import { LocalUser } from './../models/localUser';
import { UsersService } from 'src/app/core/users/users.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { of } from 'rxjs';
import { UsersService } from '../core/users/users.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = 'http://localhost:3000/v0/auth';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private jwtHelper = new JwtHelperService();

  private localUserChange: BehaviorSubject<LocalUser>;
  public onLocalUserChange: Observable<LocalUser>;

  constructor(
    private http: HttpClient,
    private usersService: UsersService
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
    return this.http.post<{ access_token: string, refresh_token: string, user: User }>(this.endpoint + '/login', {
      username,
      password
    }, {
      headers: this.headers
    }).pipe(
      map((result) => {

        localStorage.setItem('access_token', result.access_token);
        this.localUserChange.next(this.getLocalUser());

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();*/
    let user = this.usersService.getByUserName(username);
      //kann theoretisch auch undefined sein
    if (!user || user.password != password) {
      return of(false).toPromise();
    }

    sessionStorage.setItem('currentUser', user.id);
    return of(true).toPromise();
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
}
