import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { UsersService } from 'src/app/core/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class GuideGuard implements CanActivate {
  constructor(
    private router: Router ,
    private usersService: UsersService ,
    private processesService: ProcessesService ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.processesService.canWorkOn(next.paramMap.get('id'), this.usersService.getCurrentUser().id)) {
        return true;
      }
  
  
      this.router.navigate(['processes/overview']);
      return false;
  }
  
}
