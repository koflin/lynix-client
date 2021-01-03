import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { UsersService } from 'src/app/core/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class GuideGuard implements CanActivate {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private processesService: ProcessesService,
    private authService: AuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.processesService.canWorkOn(state.root.paramMap.get('id'), this.authService.getLocalUser().id)) {
      return true;
    }

    this.router.navigate(['processes/overview']);
    return false;
  }

}
