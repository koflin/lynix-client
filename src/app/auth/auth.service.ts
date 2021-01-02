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

  private accessToken: string;
  private refreshToken: string;

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
  ) { 
    this.refreshToken = localStorage.getItem('refresh_token');

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
      //kann theoretisch auch undefined sein
    if (!user || user.password != password) {
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
