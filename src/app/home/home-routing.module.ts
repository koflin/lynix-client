import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { HasUnsavedDataGuard } from '../core/guard/has-unsaved-data.guard';
import { Permission } from '../models/role';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { GuideComponent } from './view/guide/guide.component';
import { GuideGuard } from './view/guide/guide.guard';
import { OrdersDraftComponent } from './view/orders/orders-draft/orders-draft.component';
import { OrdersOverviewComponent } from './view/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './view/processes/processes-overview/processes-overview.component';
import { RolesOverviewComponent } from './view/roles/roles-overview/roles-overview.component';
import { StatisticsOverviewComponent } from './view/statistics/statistics-overview/statistics-overview.component';
import {
  ProcessTemplateDetailComponent,
} from './view/templates/process/process-template-detail/process-template-detail.component';
import {
  ProcessTemplateLibraryComponent,
} from './view/templates/process/process-template-library/process-template-library.component';
import {
  ProductTemplateDetailComponent,
} from './view/templates/product/product-template-detail/product-template-detail.component';
import {
  ProductTemplateLibraryComponent,
} from './view/templates/product/product-template-library/product-template-library.component';
import { TestingComponent } from './view/testing/testing.component';
import { UserDetailComponent } from './view/users/user-detail/user-detail.component';
import { UsersOverviewComponent } from './view/users/users-overview/users-overview.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children:[
    {
      path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
      path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    //Order
    {
      path: 'orders/overview', component: OrdersOverviewComponent, canActivate: [AuthGuard], data: { permissions: [Permission.VIEW]}
    },
    { path: 'orders/draft', component: OrdersDraftComponent, canActivate: [AuthGuard], canDeactivate:[HasUnsavedDataGuard], data: { permissions: [Permission.EDIT]} },
    { path: 'orders/draft/:id', component: OrdersDraftComponent, canActivate: [AuthGuard], canDeactivate:[HasUnsavedDataGuard], data: { permissions: [Permission.EDIT]}},
    { path: 'users', component: UsersOverviewComponent, canActivate: [AuthGuard], data: { permissions: [Permission.VIEW]}  },
    { path: 'users/:id', component: UserDetailComponent , canActivate: [AuthGuard ], canDeactivate:[HasUnsavedDataGuard], data: { permissions: [Permission.EDIT]}  },
    { path: 'roles', component: RolesOverviewComponent, canActivate: [AuthGuard], data: { permissions: [Permission.VIEW]} },

    {path: 'test/storage', component: TestingComponent, canActivate: [AuthGuard] },
    {path: 'processes/overview', component: ProcessesOverviewComponent , canActivate: [AuthGuard], data: { permissions: [Permission.VIEW]} },
    // Guide
    { path: 'guide/:id', component: GuideComponent, canActivate: [AuthGuard, GuideGuard], data: { permissions: [Permission.EXECUTE]} },
    // Templates
    { path: 'templates/product', component: ProductTemplateLibraryComponent , canActivate: [AuthGuard], data: { permissions: [Permission.EDIT]} },
    { path: 'templates/product/:id', component: ProductTemplateDetailComponent , canActivate: [AuthGuard], canDeactivate:[HasUnsavedDataGuard], data: { permissions: [Permission.EDIT]} },
    { path: 'templates/process', component: ProcessTemplateLibraryComponent, canActivate: [AuthGuard], data: { permissions: [Permission.EDIT]} },
    { path: 'templates/process/:id', component: ProcessTemplateDetailComponent, canActivate: [AuthGuard], canDeactivate:[HasUnsavedDataGuard], data: { permissions: [Permission.EDIT]} },
    // Statistics
    { path: 'statistics/overview', component: StatisticsOverviewComponent , canActivate: [AuthGuard], data: { permissions: [Permission.VIEW]} },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
