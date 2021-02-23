import { Company } from './../../models/company';

export class EditCompanyDto {
  name?: string;
  logo?: string;

  constructor(company: Company) {
    this.name = company.name;
    this.logo = company.logo;
  }
}
