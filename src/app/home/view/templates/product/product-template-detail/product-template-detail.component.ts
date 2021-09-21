import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { ProductTemplate } from 'src/app/models/productTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ComponentInfo } from 'src/app/models/ui/componentInfo';
import { ComponentType } from 'src/app/models/ui/componentType';
import { TabFragmentPipe } from 'src/app/pipes/tab/tab-fragment.pipe';
import { TabIndicesPipe } from 'src/app/pipes/tab/tab-indices.pipe';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-template-detail',
  templateUrl: './product-template-detail.component.html',
  styleUrls: ['./product-template-detail.component.scss']
})
export class ProductTemplateDetailComponent implements OnInit {

  productId: string;
  productTemplate: ProductTemplate;

  breadCrumbs: BreadCrumbInfo[];

  isEdited = false;

  processToggleIndex: number;
  stepToggleIndex: number;

  currentComponent: ComponentInfo;

  ComponentType = ComponentType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private productTemplateService: ProductTemplatesService,
    private processTemplateService: ProcessTemplatesService,
    private toastr: ToastrService,
    private indicesPipe: TabIndicesPipe,
    private fragPipe: TabFragmentPipe,
    private cref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.refresh();
    });
  }

  hasUnsavedData(): boolean {
    return this.isEdited;
  }

  async refresh() {
    if (this.productId != 'new') {
      this.productTemplate = await this.productTemplateService.getById(this.productId).toPromise();
    } else {
      this.productTemplate = {
        companyId: this.authService.getLocalUser().companyId,
        id: undefined,
        name: $localize `Unnamed Product Template`,
        description: undefined,
        processes: [],
      };
    }
  }

  async saveDraft(dontFireToastr:boolean=false) {
    for (let j = 0; j < this.productTemplate.processes.length; j++) {
      const process = this.productTemplate.processes[j];

      if (process.template.id) {
        this.processTemplateService.save(process.template);
      } else {
        process.template = await this.processTemplateService.create(process.template).toPromise();
      }
    }

    if (this.productTemplate.id) {
      this.productTemplateService.save(this.productTemplate);
    } else {
      this.productTemplate = await this.productTemplateService.create(this.productTemplate).toPromise();
      this.router.navigate(['templates/product/' + this.productTemplate.id]);
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
    this.router.navigate(['templates/product']);
  }

  updateBreadCrumb(subBreadcrumbs: BreadCrumbInfo[]) {
    if (!this.productTemplate) {
      return;
    }

    this.breadCrumbs = [{
      name: $localize `Product Templates`,
      url: new RouteInfo("/templates/product")
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
          this.deleting(this.currentComponent)

          // Show confirmation
          //this.deleteDraft()
      }
    })
  }

  cancelModal(){
    if (this.hasUnsavedData()) {
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
            // Show confirmation
            this.discardProduct()
            this.isEdited = false;
        }
      })
    } else {
      this.discardProduct()
    }
  }

  discardProduct() {
    // Ask if really want to discard changes
    this.router.navigate(['templates/product']);
  }

  deleting(data: ComponentInfo){
    switch (data.type ) {

      case ComponentType.step:
        this.productTemplate.processes[this.processToggleIndex].template.steps.splice(data.index, 1)
        break;
      case ComponentType.process:
        this.productTemplate.processes.splice(data.index, 1)
        break;
      default:
        this.deleteProduct()
        break;
    }
  }

  deleteProduct() {
    this.productTemplateService.delete(this.productId).subscribe(() => this.router.navigate(['templates/product']));
    //after deleting app should save()
  }
}
