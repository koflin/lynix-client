import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles: Role[] = [
    {
      id: 'r0',
      name: 'Developer',
      premissions: [
        'view',
        'execute',
        'edit'
      ]
    },
    {
      id: 'r1',
      name: 'Operator',
      premissions: [
        'view',
        'execute'
      ]
    },
    {
      id: 'r2',
      name: 'Process Admin',
      premissions: [
        'view',
        'edit'
      ]
    },
    {
      id: 'r3',
      name: 'Manager',
      premissions: [
        'view'
      ]
    }
  ];

  constructor() {

  }

  getById(id: string) {
    return this.roles.find(role => role.id === id);
  }

  getAll() {
    return this.roles;
  }
}
