import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Activation } from 'src/app/models/activation';

import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {
  constructor(
    private api: ApiService
  ) { }

  getByUserId(id: string) {
    return this.api.get<Activation>('activation', { userId: id });
  }

  verify(id: string, code: string) {
    return this.api.post<{userId: string}>('activation/verify/' + id, { code });
  }

  activate(id: string, code: string, password: string) {
    return this.api.post('activation/activate/' + id, { code, password }).pipe(map(() => true), catchError(() => of(false)));
  }
}
