import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = 'http://localhost:3000/v0';

  private user: BehaviorSubject<User>;
  public onUserChange: Observable<User>;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(undefined);
    this.onUserChange = this.user.asObservable();
  }

  login(username: string, password: string) {
    this.http.
  }
}
