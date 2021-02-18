import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // Login
  { path: 'login', component: LoginComponent },

  //{ path: 'home',  canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule )},
  { path: 'home',  canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
