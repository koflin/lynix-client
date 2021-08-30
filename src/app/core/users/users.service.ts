import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateUserDto } from 'src/app/dto/user/createUserDto';
import { EditUserDto } from 'src/app/dto/user/editUserDto';
import { Permission } from 'src/app/models/role';
import { User } from 'src/app/models/user';

import { ApiService } from './../api/api.service';

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

  getByEmail(email: string) {
    return this.api.get<User>('users', {
      email
    });
  }

  getMe() {
    return this.api.get<User>('users/me');
  }

  getWithPermissions(...permissions: Permission[]) {
    return this.api.get<User[]>('users', {
      permissions
    });
  }

  createUser(userDraft: User) {
    return this.api.post<User>('users', new CreateUserDto(userDraft));
  }

  save(user: User) {
    this.api.put<User>('users/' + user.id, new EditUserDto(user)).subscribe(() => this.usersChange.next(user.id));
  }

  deleteUser(id: string) {
    this.api.delete('users/' + id).subscribe(() => this.usersChange.next(id));
  }
}
