import { Injectable } from '@angular/core';
import { CompaniesService } from 'src/app/core/companies/companies.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { UserDetailNode } from 'src/app/models/ui/userDetailNode';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(
    private usersService: UsersService ,
    private rolesService: RolesService ,
    private companiesService: CompaniesService
  ) { }
  getDetail(id: string): UserDetailNode {
    let user = this.usersService.getById(id);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      password: user.password,
      role: this.rolesService.getById(user.roleId),
      company: this.companiesService.getById(user.companyId)
    };
  }

  updateDetail(userDetail: UserDetailNode) {
    this.usersService.save({
      companyId: userDetail.company.companyId,
      id: userDetail.id,
      username: userDetail.username,
      avatar: userDetail.avatar,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      password: userDetail.password,
      roleId: userDetail.role.id
    });
  }
}
