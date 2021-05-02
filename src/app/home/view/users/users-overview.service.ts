import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RolesService } from './../../../core/roles/roles.service';
import { UsersService } from './../../../core/users/users.service';
import { UserRowNode } from './../../../models/ui/userRowNode';

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
          displayName: user.displayName,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar
        } as UserRowNode;
      }))
    ));
  }
}
