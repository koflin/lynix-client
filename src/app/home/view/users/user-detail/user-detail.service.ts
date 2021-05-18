import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CompaniesService } from 'src/app/core/companies/companies.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { UserDetailNode } from 'src/app/models/ui/userDetailNode';

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
        email: user.email,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role,
        company: await this.companiesService.getById(user.companyId).toPromise(),
        activatedAt: user.activatedAt
      };
    }));
  }

  updateDetail(userDetail: UserDetailNode) {
    this.usersService.save({
      companyId: userDetail.company.id,
      id: userDetail.id,
      email: userDetail.email,
      displayName: userDetail.displayName,
      avatar: userDetail.avatar,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      role: userDetail.role,
      activatedAt: userDetail.activatedAt
    });
  }
}
