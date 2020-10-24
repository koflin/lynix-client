import { CompanyBase } from './companyBase';

export interface Company extends CompanyBase {
  name: string;
  logo?: string;
}
