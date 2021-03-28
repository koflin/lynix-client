import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

import { HasUnsavedDataGuard } from '../core/guard/has-unsaved-data.guard';
import { SharedModule } from '../shared/shared.module';
import { StatusPipe } from './../pipes/status.pipe';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { GuideComponent } from './view/guide/guide.component';
import { GuideGuard } from './view/guide/guide.guard';
import { OrdersDraftComponent } from './view/orders/orders-draft/orders-draft.component';
import { OrdersOverviewComponent } from './view/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './view/processes/processes-overview/processes-overview.component';
import { RolesOverviewComponent } from './view/roles/roles-overview/roles-overview.component';
import {
  ProcessTemplateLibraryComponent,
} from './view/templates/process-template-library/process-template-library.component';
import {
  ProductTemplateLibraryComponent,
} from './view/templates/product-template-library/product-template-library.component';
import { TestingComponent } from './view/testing/testing.component';
import { UserDetailComponent } from './view/users/user-detail/user-detail.component';
import { UsersOverviewComponent } from './view/users/users-overview/users-overview.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    OrdersOverviewComponent,
    OrdersDraftComponent,
    UsersOverviewComponent,
    TestingComponent,
    UserDetailComponent,
    ProcessesOverviewComponent,
    GuideComponent,
    ProductTemplateLibraryComponent,
    ProcessTemplateLibraryComponent,
    StatusPipe,
    RolesOverviewComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    CookieModule.forChild()
  ],
  bootstrap: [],
  providers:[HasUnsavedDataGuard, GuideGuard ]

})
export class HomeModule { }
