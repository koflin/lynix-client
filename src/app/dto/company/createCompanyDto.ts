
export class CreateCompanyDto {
  name: string;
  logo?: string;

  constructor(name: string, logo?: string) {
    this.name = name;
    this.logo = logo;
  }
}
