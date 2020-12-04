import { ApiService } from './../api/api.service';
import { Company } from './../../models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private api: ApiService) {
  }

  getById(id: string) {
    return this.api.get<Company>('companies/' + id);
  }
}
