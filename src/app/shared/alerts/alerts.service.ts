import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  alertSuccess(text: string) {
    this.toastr.show(
      '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
      + $localize `Success` + '</span> <span>' + text + '</span></div>',
      '',
      {
        timeOut: 1500,
        closeButton: true,
        enableHtml: true,

        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass: "ngx-toastr alert alert-dismissible alert-success alert-notify",
      }
    );
  }

  alertError(error: string | Error | HttpErrorResponse) {
    if (error instanceof Error) {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
        + `${error.name}</span><br><span>${error.message}</span></div>`,
        '',
        {
          timeOut: 10000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-top-center',
          toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify",
        }
      );
    } else if (error instanceof HttpErrorResponse) {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
        + $localize `Error</span><br><span>${error.error.message}</span></div>`,
        '',
        {
          timeOut: 10000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-top-center',
          toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify",
        }
      );
    } else {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
        + $localize `Error` + '</span><br><span>' + error + '</span></div>',
        '',
        {
          timeOut: 10000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-top-center',
          toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify",
        }
      );
    }
  }

  alertWarning(text: string) {
    this.toastr.show(
      '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
      + $localize `Warning` + '</span> <span>' + text + '</span></div>',
      '',
      {
        timeOut: 1500,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass: "ngx-toastr alert alert-dismissible alert-warning alert-notify",
      }
    );
  }

  alertSaved() {
    this.alertSuccess($localize `Saved`)
  }
}
