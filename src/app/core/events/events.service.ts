import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from 'src/app/auth/auth.service';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private webSocketRoot = 'ws://localhost:3001';

  private socket: Socket;

  constructor(
    private authService: AuthService
  ) {
    this.authService.onLocalUserChange.subscribe((user) => {
      if (this.socket && this.socket.active) {
        this.socket.close();
      }

      if (user) {
        this.socket = io(this.webSocketRoot, { transports: ['websocket'], auth: { token: localStorage.getItem('access_token') }});
      } else {
        if (this.socket) {
          this.socket.disconnect();
          this.socket = null;
        }
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
