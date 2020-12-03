import { Company } from './../../models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [
    {
      id: 'c0',
      name: 'Lynix',
      logo: null,
    },
    {
      id: 'c1',
      name : 'Stadler Winterthur AG',
      logo: null,
    }
  ];

  constructor() { }

  getById(id: string) {
    return this.companies.find(company => company.id === id);
  }
}
