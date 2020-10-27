import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  get roles(): Role[] {
    return JSON.parse(sessionStorage.getItem('roles'));
  }

  set roles(roles: Role[]) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  constructor() {
    if (!this.roles) {
      sessionStorage.setItem('roles', '[{"id":"r0","name":"Developer","premissions":["view","execute","edit"]},{"id":"r1","name":"Operator","premissions":["view","execute"]},{"id":"r2","name":"Process Admin","premissions":["view","edit"]},{"id":"r3","name":"Manager","premissions":["view"]}]');
    }
  }

  getById(id: string) {
    return this.roles.find(role => role.id === id);
  }

  getAll() {
    return this.roles;
  }
}
