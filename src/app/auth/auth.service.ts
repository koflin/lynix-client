import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = 'http://localhost:3000/v0/auth';

  private user: BehaviorSubject<User>;
  public onUserChange: Observable<User>;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(undefined);
    this.onUserChange = this.user.asObservable();
  }

  getUser() {
    return this.user.value;
  }

  login(username: string, password: string): Promise<boolean> {
    return this.http.post<{ access_token: string, user: User }>(this.endpoint + '/login', {
      username,
      password
    }, {
      headers: this.header
    }).pipe(
      map((result) => {
        localStorage.setItem('access_token', result.access_token);
        this.user.next(result.user);

        return true;
      }),
      catchError((error, caught) => {
        return of(false);
      })
    ).toPromise();
  }
}
