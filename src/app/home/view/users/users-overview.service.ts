import { Injectable } from '@angular/core';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { UserRowNode } from 'src/app/models/ui/userRowNode';

@Injectable({
  providedIn: 'root'
})
export class UsersOverviewService {

  constructor(private usersService: UsersService,
    private rolesService: RolesService ) { }
  getRows(): UserRowNode[] {
    return this.usersService.getAll().map((user): UserRowNode => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: this.rolesService.getById(user.roleId),
        avatar: user.avatar
      };
    });
  }
}
