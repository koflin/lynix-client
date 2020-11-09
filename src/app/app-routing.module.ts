import { TestDialogComponent } from './test/test-dialog/test-dialog.component';
import { UserDraftComponent } from './components/user-draft/user-draft.component';
import { UsersOverviewComponent } from './views/users/users-overview/users-overview.component';
import { UsersDetailComponent } from './views/users/users-detail/users-detail.component';
import { GuideGuard } from './views/guide/guide.guard';
import { OrdersDraftComponent } from './views/orders/orders-draft/orders-draft.component';
import { ToolLibraryComponent } from './views/tools/tool-library/tool-library.component';
import { ProcessTemplateLibraryComponent } from './views/templates/process/process-template-library/process-template-library.component';
import { ProductTemplateLibraryComponent } from './views/templates/product/product-template-library/product-template-library.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth/auth.guard';
import { OrdersOverviewComponent } from './views/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './views/processes/processes-overview/processes-overview.component';
import { GuideComponent } from './views/guide/guide.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // Orders
  { path: 'orders/overview', component: OrdersOverviewComponent, canActivate: [AuthGuard] },
  { path: 'orders/draft', component: OrdersDraftComponent, canActivate: [AuthGuard] },
  { path: 'orders/draft/:id', component: OrdersDraftComponent, canActivate: [AuthGuard] },
  // Processes
  { path: 'processes/overview', component: ProcessesOverviewComponent, canActivate: [AuthGuard] },
  // Templates
  { path: 'templates/product', component: ProductTemplateLibraryComponent, canActivate: [AuthGuard] },
  { path: 'templates/process', component: ProcessTemplateLibraryComponent, canActivate: [AuthGuard] },
  // Guide
  { path: 'guide/:id', component: GuideComponent, canActivate: [AuthGuard, GuideGuard] },
  // Users
  { path: 'users', component: UsersOverviewComponent, canActivate: [AuthGuard]},
  { path: 'users/:id', component: UsersDetailComponent, canActivate: [AuthGuard]},
  // Tools
  { path: 'tools', component: ToolLibraryComponent, canActivate: [AuthGuard] },
  // Testing
  { path: 'test/storage', component: TestComponent },
  { path: 'test/dialog', component: TestDialogComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
