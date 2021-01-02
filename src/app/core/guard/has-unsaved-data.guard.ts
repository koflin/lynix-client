import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedDataGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: HasUnsavedData): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.hasUnsavedData && component.hasUnsavedData()) {
        
        return confirm('You have some unsaved form data. Are you sure, you want to leave this page?');
      }
      return true;
  }
  
}
