export class CreateUserDto {
  companyId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  avatar?: string;

  constructor(user: CreateUserDto) {
    Object.assign(this, user);
  }
}
