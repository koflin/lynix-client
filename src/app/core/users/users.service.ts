import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './../api/api.service';
import { AuthService } from './../../auth/auth.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { Injectable } from '@angular/core';
import { Permission } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersChange: BehaviorSubject<string>;
  public onUsersChange: Observable<string>;

  constructor(
    private api: ApiService,
  ) {
    this.usersChange = new BehaviorSubject(null);
    this.onUsersChange = this.usersChange.asObservable();
  }

  getAll() {
    return this.api.get<User[]>('users');
  }

  getById(id: string) {
    return this.api.get<User>('users/' + id);
  }

  getByUserName(username: string) {
    return this.api.get<User>('users', {
      username
    });
  }

  /*getWithPermissions(...permissions: Permission[]): User[] {
    return this.users.filter(user => {
      let role = this.rolesService.getById(user.roleId);

      return permissions.every(permission => {
        return role.premissions.indexOf(permission) !== -1;
      });
    });
  }*/

  createUser(userDraft: User) {
    this.api.post<User>('users', userDraft).subscribe(user => this.usersChange.next(user.id));
  }

  save(user: User) {
    this.api.put<User>('users/' + user.id, user).subscribe(() => this.usersChange.next(user.id));
  }

  deleteUser(id: string) {
    this.api.delte('users/' + id).subscribe(() => this.usersChange.next(id));
  }
}
