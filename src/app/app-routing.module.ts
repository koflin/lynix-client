import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { ActivationComponent } from './views/activation/activation.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // Login
  { path: 'login', component: LoginComponent },
  { path: 'activation/:id', component: ActivationComponent },

  //{ path: 'home',  canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule )},
  { path: 'home',  canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
