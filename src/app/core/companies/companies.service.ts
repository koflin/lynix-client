import { Company } from './../../models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [
    {
      companyId: 'c0',
      name: 'Lynix'
    },
    {
      companyId: 'c1',
      name : 'Stadler Winterthur AG'
    }
  ];

  constructor() { }

  getById(id: string) {
    return this.companies.find(company => company.companyId === id);
  }
}
