import { Role } from 'src/app/models/role';
export interface UserRowNode {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
}
