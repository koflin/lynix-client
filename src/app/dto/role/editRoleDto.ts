import { Role } from 'src/app/models/role';
import { Permission } from './../../models/role';

export class EditRoleDto {
  name: string;
  premissions: Permission[];

  constructor(role: Role) {
    Object.assign(this, role);
  }
}
