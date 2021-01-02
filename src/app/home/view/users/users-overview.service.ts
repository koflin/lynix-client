import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserRowNode } from './../../../models/ui/userRowNode';
import { RolesService } from './../../../core/roles/roles.service';
import { UsersService } from './../../../core/users/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersOverviewService {

  public onUsersChange: Observable<string>;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {
    this.onUsersChange = usersService.onUsersChange;
  }

  getRows() {
    return this.usersService.getAll().pipe(switchMap(users =>
      Promise.all(users.map(async (user) => {
        return {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: this.rolesService.getById(user.roleId)
        } as UserRowNode;
      }))
    ));
  }
}
