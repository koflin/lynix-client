import { ProcessesService } from './../../core/processes/processes.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideGuard implements CanActivate {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private processesService: ProcessesService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.processesService.canWorkOn(route.paramMap.get('id'), this.usersService.getCurrentUser().id)) {
      return true;
    }

    console.log(this.usersService.getCurrentUser().id + ': ' + route.paramMap.get('id'));

    this.router.navigate(['processes/overview']);
    return false;
  }

}
