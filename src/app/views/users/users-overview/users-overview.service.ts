import { UserRowNode } from './../../../models/ui/userRowNode';
import { RolesService } from './../../../core/roles/roles.service';
import { UsersService } from './../../../core/users/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersOverviewService {

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) { }

  getRows(): UserRowNode[] {
    return this.usersService.getAll().map((user): UserRowNode => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: this.rolesService.getById(user.roleId)
      };
    });
  }
}
