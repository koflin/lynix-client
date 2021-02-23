import { StatusPipe } from './../pipes/status.pipe';
import { ApiService } from './../core/api/api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersOverviewComponent } from './view/orders/orders-overview/orders-overview.component';
import { OrdersDraftComponent } from './view/orders/orders-draft/orders-draft.component';
import { UsersOverviewComponent } from './view/users/users-overview/users-overview.component';
import { TestingComponent } from './view/testing/testing.component';
import { UserDetailComponent } from './view/users/user-detail/user-detail.component';
import { HasUnsavedDataGuard } from '../core/guard/has-unsaved-data.guard';
import { ProcessesOverviewComponent } from './view/processes/processes-overview/processes-overview.component';
import { GuideComponent } from './view/guide/guide.component';
import { GuideGuard } from './view/guide/guide.guard';
import { ProductTemplateLibraryComponent } from './view/templates/product-template-library/product-template-library.component';
import { ProcessTemplateLibraryComponent } from './view/templates/process-template-library/process-template-library.component';
import { RouterModule } from '@angular/router';


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
    StatusPipe
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ],
  bootstrap: [],
  providers:[HasUnsavedDataGuard, GuideGuard ]

})
export class HomeModule { }
