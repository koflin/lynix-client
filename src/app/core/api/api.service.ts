import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiRoot = 'http://localhost:3000/v0/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  });

  constructor(private http: HttpClient) {
  }

  get<T>(route: string, params?: { [param: string]: string }) {
    return this.http.get<T>(this.apiRoot + route, { params });
  }

  post<T>(route: string, body?: any) {
    return this.http.post<T>(this.apiRoot + route, body);
  }

  put<T>(route: string, body?: any) {
    return this.http.put<T>(this.apiRoot + route, body);
  }

  patch<T>(route: string, body?: any) {
    return this.http.patch<T>(this.apiRoot + route, body);
  }

  delte(route: string) {
    return this.http.delete(this.apiRoot + route);
  }
}
