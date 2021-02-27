import { RolesOverviewComponent } from './view/roles/roles-overview/roles-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate  } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HasUnsavedDataGuard } from '../core/guard/has-unsaved-data.guard';

import { HomeComponent } from './home.component';
import { ProcessTemplateLibraryComponent } from './view/templates/process-template-library/process-template-library.component';
import { ProductTemplateLibraryComponent } from './view/templates/product-template-library/product-template-library.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { GuideComponent } from './view/guide/guide.component';
import { GuideGuard } from './view/guide/guide.guard';
import { OrdersDraftComponent } from './view/orders/orders-draft/orders-draft.component';
import { OrdersOverviewComponent } from './view/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './view/processes/processes-overview/processes-overview.component';
import { TestingComponent } from './view/testing/testing.component';
import { UserDetailComponent } from './view/users/user-detail/user-detail.component';
import { UsersOverviewComponent } from './view/users/users-overview/users-overview.component';



const routes: Routes = [
  { path: '', component: HomeComponent, children:[
    {
      path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]
    },
    //Order
    {
      path: 'orders/overview', component: OrdersOverviewComponent, canActivate: [AuthGuard]
    },
    { path: 'orders/draft', component: OrdersDraftComponent, canActivate: [AuthGuard] },
    { path: 'orders/draft/:id', component: OrdersDraftComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersOverviewComponent, canActivate: [AuthGuard]  },
    { path: 'users/:id', component: UserDetailComponent , canActivate: [AuthGuard ], canDeactivate:[HasUnsavedDataGuard]  },
    { path: 'roles', component: RolesOverviewComponent, canActivate: [AuthGuard] },

    {path: 'test/storage', component: TestingComponent, canActivate: [AuthGuard] },
    {path: 'processes/overview', component: ProcessesOverviewComponent , canActivate: [AuthGuard] },
    // Guide
    { path: 'guide/:id', component: GuideComponent, canActivate: [AuthGuard, GuideGuard] },
    // Templates
  { path: 'templates/product', component: ProductTemplateLibraryComponent , canActivate: [AuthGuard] },
  { path: 'templates/process', component: ProcessTemplateLibraryComponent, canActivate: [AuthGuard] },


  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
