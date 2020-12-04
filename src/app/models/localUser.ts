import { CompanyBase } from './companyBase';
export interface LocalUser extends CompanyBase {
  id: string;
  username: string;
}
