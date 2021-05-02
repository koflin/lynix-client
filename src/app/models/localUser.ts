import { CompanyBase } from './companyBase';
import { Permission } from './role';

export interface LocalUser extends CompanyBase {
  id: string;
  email: string;
  permissions: Permission[];
}
