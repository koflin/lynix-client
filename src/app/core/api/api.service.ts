import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiRoot = environment.apiHost;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
    ) {
  }

  get<T>(route: string, queryParams?: any) {
    let query = '?';

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        query += key + '=' + encodeURIComponent(queryParams[key]) + '&';
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

  setToken(token: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + token);
  }
}
