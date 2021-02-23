import { EditCompanyDto } from './../../dto/company/editCompanyDto';
import { ApiService } from './../api/api.service';
import { Company } from './../../models/company';
import { Injectable } from '@angular/core';
import { CreateCompanyDto } from 'src/app/dto/company/createCompanyDto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private api: ApiService) {
  }

  getById(id: string) {
    return this.api.get<Company>('companies/' + id);
  }

  create(name: string) {
    return this.api.post<Company>('companies', new CreateCompanyDto(name)).pipe(map((company) => company.id));
  }
}
