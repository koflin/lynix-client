import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from 'src/app/auth/auth.service';
import { Event } from 'src/app/models/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private webSocketRoot = environment.gatewayHost;

  private socket: Socket;

  constructor(
    private authService: AuthService
  ) {
    this.authService.onLocalUserChange.subscribe((user) => {

      if (this.socket && this.socket.connected) {
        this.socket.disconnect();
      }

      if (user) {
        this.socket = io(this.webSocketRoot, { transports: ['websocket'], auth: { token: authService.getToken() }});
      }
    });
  }

  onEvent<T = any>(type: Event): Observable<T> {
    return new Observable((observer) => {
      this.socket.on(type.valueOf().toString(), (data: T) => {
        observer.next(data);
      });
    });
  }

  onEvents<T>(...types: Event[]): Observable<T> {
    return new Observable((observer) => {
      for (let type of types) {
        this.socket.on(type.valueOf().toString(), (data: T) => {
          observer.next(data);
        });
      }
    });
  }

  emit(type: Event, data: any) {
    this.socket.emit(type.valueOf().toString(), data);
  }
}
