import { User } from 'src/app/models/user';
import { Company } from './../company';
import { Role } from '../role';

export interface UserDetailNode extends Omit<User, 'roleId' | 'companyId'>{
  role: Role;
  company: Company;
}
