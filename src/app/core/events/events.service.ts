import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private webSocketRoot = 'ws://localhost:3001';

  private socket: Socket;

  constructor(
    private authService: AuthService
  ) {
    console.log("Connect");
    this.socket = io(this.webSocketRoot, { auth: { token: localStorage.getItem('access_token') }});
  }

  onEvent<T>(type: string): Observable<T> {
    return new Observable((observer) => {
      this.socket.on(type, data => {
        observer.next(data);
      });
    });
  }

  emit(type: string, data: any) {
    this.socket.emit(type, data);
  }
}
