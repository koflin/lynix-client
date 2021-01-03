import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { CompaniesService } from './companies/companies.service';
import { HasUnsavedDataGuard } from './guard/has-unsaved-data.guard';
import { OrdersService } from './orders/orders.service';
import { ProcessesService } from './processes/processes.service';
import { ProductTemplatesService } from './productTemplates/product-tempaltes.service';
import { RolesService } from './roles/roles.service';
import { ToolsService } from './tools/tools.service';
import { UsersService } from './users/users.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ApiService,
    CompaniesService,
    OrdersService,
    ProcessesService,
    ProductTemplatesService,
    RolesService,
    ToolsService,
    UsersService,
    HasUnsavedDataGuard
  ]
})
export class CoreModule { }
