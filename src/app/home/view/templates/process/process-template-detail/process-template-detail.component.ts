import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
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

  get stepsName() {
    return this.processTemplate.stepTemplates.map(step => step.title);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private processTemplateService: ProcessTemplatesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.processId = params.get('id');
      this.refresh();
    });

    this.route.fragment.subscribe((fragment) => {
      if (!fragment) {
        this.stepToggleId = undefined;
        return;
      }

      if (fragment.length >= 1) {
        this.stepToggleId = parseInt(fragment[0]);
      }
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
        name: 'Unnamed',
        stepTemplates: [],
        mainTasks: [],
        previousComments: []
      };
    }

    this.breadCrumbs = [{name:"Process Template", url: "/templates/process" },
      {name:(this.processTemplate.id)? this.processTemplate.name : 'New', url:this.router.url}]
  }

  deleteModal(){
    const step = this.processTemplate.stepTemplates[this.stepToggleId];

    swal.fire({
      title: 'Are you sure to delete step' + ' \'' + step.title + "\'?",
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: 'Yes, delete!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
        this.processTemplate.stepTemplates.splice(this.stepToggleId, 1);
        this.detectChange();
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
        '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">Success</span> <span>Saved</span></div>',
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
    this.router.navigate(['templates/process']);
  }
}
