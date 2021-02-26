import { User } from "src/app/models/user";

export class CreateUserDto {
  companyId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  avatar?: string;

  constructor(user: User) {
    Object.assign(this, user);

    this.roleId = user.role.id;
  }
}
