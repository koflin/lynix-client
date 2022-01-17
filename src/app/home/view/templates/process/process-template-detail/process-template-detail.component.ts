import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ComponentInfo } from 'src/app/models/ui/componentInfo';
import { ComponentType } from 'src/app/models/ui/componentType';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
import { TabFragmentPipe } from 'src/app/pipes/tab/tab-fragment.pipe';
import { TabIndicesPipe } from 'src/app/pipes/tab/tab-indices.pipe';
import swal from 'sweetalert2';

@Component({
  selector: 'app-process-template-detail',
  templateUrl: './process-template-detail.component.html',
  styleUrls: ['./process-template-detail.component.scss']
})
export class ProcessTemplateDetailComponent implements OnInit, HasUnsavedData {

  processId: string;
  processTemplate: ProcessTemplate;

  breadCrumbs: BreadCrumbInfo[];

  isEdited = false;
  stepToggleIndex: number;

  currentComponent: ComponentInfo;

  returnUrl: string = '/templates/process';

  ComponentType = ComponentType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private processTemplateService: ProcessTemplatesService,
    private toastr: ToastrService,
    private indiciesPipe: TabIndicesPipe,
    private fragPipe: TabFragmentPipe,
    private cref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.processId = params.get('id');
      this.refresh();
    });

    this.route.queryParamMap.subscribe((query) => {
      if (query && query.get('return')) {
        const returnType = query.get('return');

        if (returnType === 'manual') {
          this.returnUrl = '/manuals/overview';
        }
      }
    });
  }

  hasUnsavedData(): boolean {
    return this.isEdited;
  }

  async refresh() {
    if (this.processId != 'new') {
      this.processTemplate = await this.processTemplateService.getById(this.processId).toPromise();
    } else {
      this.processTemplate = {
        companyId: this.authService.getLocalUser().companyId,
        id: undefined,
        name: $localize `Unnamed Process Template`,
        steps: [],
        mainTasks: [],
        previousComments: []
      };
    }
  }

  updateBreadCrumb(subBreadcrumbs: BreadCrumbInfo[]) {
    if (!this.processTemplate) {
      return;
    }

    this.breadCrumbs = [{
      name: $localize `Process Templates`,
      url: new RouteInfo(this.returnUrl)
    }, ...subBreadcrumbs];

    this.cref.detectChanges();
  }

  deleteModal(){
    swal.fire({
      title: $localize `Are you sure to delete ${this.currentComponent.typeDisplayname} '${this.currentComponent.name}'?`,
      text: $localize `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: $localize `Yes, delete!`,
      cancelButtonClass: 'btn btn-secondary',
      cancelButtonText: $localize `Cancel`
    }).then((result) => {
      if (result.value) {
        this.deleting(this.currentComponent);
      }
    })
  }

  async saveDraft(dontFireToastr:boolean=false) {
    if (this.processTemplate.id) {
      this.processTemplateService.save(this.processTemplate);
    } else {
      this.processTemplate = await this.processTemplateService.create(this.processTemplate).toPromise();
      this.router.navigate(['templates/process/' + this.processTemplate.id]);
    }

    if (!dontFireToastr) {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
        + $localize `Success` + '</span> <span>' + $localize `Saved` + '</span></div>',
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

    this.isEdited = false;
  }

  cancle() {
    this.router.navigate([this.returnUrl]);
  }

  deleting(data: ComponentInfo){
    switch (data.type ) {
      case ComponentType.step:
        const steps = this.processTemplate.steps;
        steps.splice(data.index, 1);

        if (this.stepToggleIndex === steps.length) {
          this.stepToggleIndex--;
        }

        if (this.stepToggleIndex < 0) {
          this.stepToggleIndex == undefined;
        }
        break;
      default:
        this.deleteProcess()
        return;
    }

    this.processTemplate = {...this.processTemplate};
  }

  deleteProcess() {
    this.processTemplateService.delete(this.processId).subscribe(() => this.router.navigate([this.returnUrl]));
  }
}
