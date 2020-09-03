import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
