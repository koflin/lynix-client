import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { switchAll, catchError, map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private webSocketRoot = 'ws://localhost:3001';

  private socket: WebSocketSubject<any>;
  private event: Observable<any>;

  constructor(
    private authService: AuthService
  ) {
    this.connect();
  }

  private connect() {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket(this.webSocketRoot);
      /*this.event = this.socket.asObservable();

      this.event.subscribe((data) => console.log(data));*/
      this.socket.subscribe(data => console.log(data), error => console.log(error));
    }
  }

  onEvent(type: string) {
    return this.event.pipe(
      catchError(error => { throw error }),
      filter(data => data.type == type)
    );
  }
}
