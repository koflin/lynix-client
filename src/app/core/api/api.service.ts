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

  get<T>(route: string, queryParams?: { [param: string]: string }) {
    let query = '?';

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        query += + key + '=' + encodeURIComponent(queryParams[key]) + '&';
      }
    }

    query = query.substr(0, query.length - 1);

    return this.http.get<T>(this.apiRoot + route + query, {
      headers: this.headers
    });
  }

  post<T>(route: string, body?: any) {
    return this.http.post<T>(this.apiRoot + route, body, {
      headers: this.headers
    });
  }

  put<T>(route: string, body?: any) {
    return this.http.put<T>(this.apiRoot + route, body, {
      headers: this.headers
    });
  }

  patch<T>(route: string, body?: any) {
    return this.http.patch<T>(this.apiRoot + route, body, {
      headers: this.headers
    });
  }

  delete(route: string) {
    return this.http.delete(this.apiRoot + route, {
      headers: this.headers
    });
  }
}
