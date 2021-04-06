import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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

    return new Promise(async (resolve) => {

      const process = await this.processesService.getById(next.paramMap.get('id')).toPromise();
      const localUser = this.authService.getLocalUser();

      if (process && process.assignedUserId === localUser.id && process.occupiedBy === localUser.id) {
        resolve(true);
        return;
      }

      this.router.navigate(['processes/overview']);
      resolve(false);
    });
  }
}
