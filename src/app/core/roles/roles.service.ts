import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private api: ApiService
  ) {
  }

  getById(id: string) {
    return this.api.get<Role>('roles/' + id);
  }

  getAll() {
    return this.api.get<Role[]>('roles');
  }
}
