import { CompanyBase } from './companyBase';

export interface User extends CompanyBase {
  id: string;
  password?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  avatar?: string;
}
