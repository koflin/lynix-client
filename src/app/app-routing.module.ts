import { GuideGuard } from './views/guide/guide.guard';
import { OrdersDraftComponent } from './views/orders/orders-draft/orders-draft.component';
import { ToolLibraryComponent } from './views/tools/tool-library/tool-library.component';
import { ProcessTemplateLibraryComponent } from './views/templates/process/process-template-library/process-template-library.component';
import { ProductTemplateLibraryComponent } from './views/templates/product/product-template-library/product-template-library.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { OrdersOverviewComponent } from './views/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './views/processes/processes-overview/processes-overview.component';
import { LoginComponent } from './login/login.component';
import { GuideComponent } from './views/guide/guide.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'orders/overview', component: OrdersOverviewComponent, canActivate: [AuthGuard] },
  { path: 'orders/draft', component: OrdersDraftComponent, canActivate: [AuthGuard] },
  { path: 'orders/draft/:id', component: OrdersDraftComponent, canActivate: [AuthGuard] },
  { path: 'processes/overview', component: ProcessesOverviewComponent, canActivate: [AuthGuard] },
  { path: 'templates/product', component: ProductTemplateLibraryComponent, canActivate: [AuthGuard] },
  { path: 'templates/process', component: ProcessTemplateLibraryComponent, canActivate: [AuthGuard] },
  { path: 'guide/:id', component: GuideComponent, canActivate: [AuthGuard, GuideGuard] },
  { path: 'tools', component: ToolLibraryComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
