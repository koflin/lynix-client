import { switchMap } from 'rxjs/operators';
import { CompaniesService } from './../../../core/companies/companies.service';
import { UserDetailNode } from './../../../models/ui/userDetailNode';
import { Injectable } from '@angular/core';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailService {

  private detailChange: BehaviorSubject<string>;
  public onDetailChange: Observable<string>;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private companiesService: CompaniesService
  ) {
    this.detailChange = new BehaviorSubject(null);
    this.onDetailChange = this.detailChange.asObservable();

    this.usersService.onUsersChange.subscribe(id => {
      this.detailChange.next(id);
    });
  }

  getDetail(id: string): Observable<UserDetailNode> {
    return this.usersService.getById(id).pipe(switchMap(async (user) => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: this.rolesService.getById(user.roleId),
        company: await this.companiesService.getById(user.companyId).toPromise()
      };
    }));
  }

  updateDetail(userDetail: UserDetailNode) {
    this.usersService.save({
      companyId: userDetail.company.id,
      id: userDetail.id,
      username: userDetail.username,
      avatar: userDetail.avatar,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      roleId: userDetail.role.id
    });
  }
}
