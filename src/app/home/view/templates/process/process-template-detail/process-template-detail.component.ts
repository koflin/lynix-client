import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { deletingDataInformation } from 'src/app/models/ui/deletingData';
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
  stepToggleId: number;

  returnUrl: string = '/templates/process';

  get stepsName() {
    return this.processTemplate.steps.map(step => step.title);
  }

  private getBaseUrl() {
    return '/templates/process/' + this.processId;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private processTemplateService: ProcessTemplatesService,
    private toastr: ToastrService,
    private indiciesPipe: TabIndicesPipe,
    private fragPipe: TabFragmentPipe,
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

    this.route.fragment.subscribe((fragment) => {
      this.stepToggleId = undefined;

      if (fragment) {
        const tabs = this.indiciesPipe.transform(fragment);

        if (tabs.length >= 1) {
          this.stepToggleId = tabs[0];
        }
      }

      this.updateBreadCrumb();
    });
  }

  hasUnsavedData(): boolean {
    return this.isEdited;
  }

  detectChange() {
    this.isEdited = true;
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

    this.updateBreadCrumb();
  }

  updateBreadCrumb() {
    if (!this.processTemplate) {
      return;
    }

    let breadCrumb = [{
      name: $localize `Process Templates`,
      url: this.returnUrl
    }, {
      name:(this.processTemplate?.id) ? this.processTemplate.name : $localize `New`,
      url: this.getBaseUrl()
    }];

    if (this.stepToggleId != undefined) {
      breadCrumb.push({
        name: this.stepsName[this.stepToggleId],
        url: this.getBaseUrl() + '#' + this.fragPipe.transform([this.stepToggleId])
      });
    }

    this.breadCrumbs = breadCrumb;
  }

  deleteModal(){
    let data: deletingDataInformation = this.specificDeleteData()

    swal.fire({
      title: $localize `Are you sure to delete ${data.tabContainerDisplayname} '${data.tabName}'?`,
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
          this.deleting(data)
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

  specificDeleteData(): deletingDataInformation{
    let container= this.defContainer()
    let deletingData:deletingDataInformation={'parentTabId':undefined,
      'tabId': undefined, 'tabName': undefined, 'tabContainerName':undefined, 'tabContainerDisplayname':undefined}
    switch (container) {
      case 'step':
        deletingData.parentTabId=0
        deletingData.tabId=this.stepToggleId
        deletingData.tabName= this.stepsName[this.stepToggleId]
        deletingData.tabContainerName='step'
        deletingData.tabContainerDisplayname= $localize `step`
        break;
      default:
        deletingData.parentTabId=0
        deletingData.tabId=0
        deletingData.tabName= this.processTemplate.name
        deletingData.tabContainerName='process'
        deletingData.tabContainerDisplayname= $localize `process`
        break;
    }
    return deletingData
  }

  deleting(data: deletingDataInformation){
    switch (data.tabContainerName ) {

      case 'step':
        this.processTemplate.steps.splice(data.tabId, 1)
        break;
      default:
        this.deleteProcess()
        break;
    }
  }

  defContainer(){
    if (this.stepToggleId!=undefined) {
      return 'step'
    } else {
      return 'process'
    }
  }

  deleteProcess() {
    this.processTemplateService.delete(this.processId).subscribe(() => this.router.navigate([this.returnUrl]));
  }
}
