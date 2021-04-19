import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedDataGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: HasUnsavedData): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.hasUnsavedData && component.hasUnsavedData()) {

        return new Promise(async (resolve) => {
          swal.fire({
            title: $localize `You have unsaved data`,
            text: $localize `Are you sure, you want to leave this page?`,
            type: 'warning',
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            confirmButtonText: $localize `Yes, cancel!`,
            cancelButtonClass: 'btn btn-secondary',
            cancelButtonText: $localize `Cancel`
          }).then((result) => {
            if (result.value) {
                resolve(true);
            } else {
              resolve(false);
            }
          })
        });

        //return confirm('You have some unsaved form data. Are you sure, you want to leave this page?');
      }
      return true;
  }

}
