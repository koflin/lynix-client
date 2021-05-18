import { Role } from 'src/app/models/role';

export interface UserRowNode {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  avatar?: string
}
