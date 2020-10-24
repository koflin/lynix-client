import { RolesService } from './../../core/roles/roles.service';
import { Role } from 'src/app/models/role';
import { Company } from './../../models/company';
import { CompaniesService } from './../../core/companies/companies.service';
import { User } from './../../models/user';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-draft',
  templateUrl: './user-draft.component.html',
  styleUrls: ['./user-draft.component.scss']
})
export class UserDraftComponent implements OnInit {

  company: Company;
  availableRoles: Role[];
  userDraft: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userDraft: User },
    private companiesService: CompaniesService,
    private rolesService: RolesService) {

    this.userDraft = data.userDraft;
    this.company = this.companiesService.getById(this.userDraft.companyId);
    this.availableRoles = this.rolesService.getAll();
  }

  ngOnInit(): void {
  }

}
