import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { ProductTemplate } from 'src/app/models/productTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { deletingDataInformation } from 'src/app/models/ui/deletingData';
import { TabIndicesPipe } from 'src/app/pipes/tab-indices/tab-indices.pipe';
import swal from 'sweetalert2';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-product-template-detail',
  templateUrl: './product-template-detail.component.html',
  styleUrls: ['./product-template-detail.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class ProductTemplateDetailComponent implements OnInit {

  productId: string;
  productTemplate: ProductTemplate;
  breadCrumbs: BreadCrumbInfo[];

  _processesNames:string[]=[]
  get processesNames():string[]{
    return this.productTemplate.processes.filter((p) => {
      return p.template
    }).map((process)=>{
      return process.template.name
    })
  }

  _stepsName:string[]=[]
  get stepsName():string[]{
    if (this.processToggleId != undefined) {
      return this.productTemplate.processes[this.processToggleId].template.stepTemplates.filter((p) => {
        return p.title
      }).map((process)=>{
        return process.title
      })
    }
    return []

  }
  _stepToggleId:number
  get stepToggleId(){
    return this._stepToggleId
  }

  _processToggleId:number
  get processToggleId(){
    return this._processToggleId
  }

  isEdited = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private productTemplateService: ProductTemplatesService,
    private processTemplateService: ProcessTemplatesService,
    private toastr: ToastrService,
    private indicesPipe: TabIndicesPipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.refresh();
    });

    this.route.fragment.subscribe((fragment) => {
      this._processToggleId = undefined;
      this._stepToggleId = undefined;

      if (!fragment) {
        return;
      }

      const parts = this.indicesPipe.transform(fragment);

      if (parts.length >= 1) {
        this._processToggleId = parts[0];
      }

      if (parts.length >= 2) {
        this._stepToggleId = parts[1];
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
    if (this.productId != 'new') {
      this.productTemplate = await this.productTemplateService.getById(this.productId).toPromise();
    } else {
      this.productTemplate = {
        companyId: this.authService.getLocalUser().companyId,
        id: undefined,
        name: 'Unnamed',
        description: undefined,
        processes: [],
      };
    }

    this.breadCrumbs = [{name:"Product Template", url: "/templates/product" },
      {name:(this.productTemplate.id)? this.productTemplate.name : 'New', url: this.router.url}]
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
    this.router.navigate(['templates/product']);
  }

  defContainer(){
    if (this.stepToggleId!=undefined) {
      return 'step'
    }else if (this.processToggleId != undefined) {
      return 'process'
    } else {
      return 'product'
    }
  }

  deleteModal(){
    let data: deletingDataInformation = this.specificDeleteData()

    swal.fire({
      title: 'Are you sure to delete ' + data.tabContainerPublicName + ' \'' + data.tabName + "\'?",
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: 'Yes, delete!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
          this.deleting(data)

          // Show confirmation
          //this.deleteDraft()
      }
    })
  }

  specificDeleteData(): deletingDataInformation{
    let container= this.defContainer()
    let deletingData:deletingDataInformation={'parentTabId':undefined,
      'tabId': undefined, 'tabName': undefined, 'tabContainerPublicName':undefined}
    switch (container) {
      case 'step':
        deletingData.parentTabId=this.processToggleId
        deletingData.tabId=this.stepToggleId
        deletingData.tabName= this.stepsName[this.stepToggleId]
        deletingData.tabContainerPublicName='step'
        break;
      case 'process':
        deletingData.parentTabId=0
        deletingData.tabId=this.processToggleId
        deletingData.tabName= this.processesNames[this.processToggleId]
        deletingData.tabContainerPublicName='process'
        break;
      default:
        deletingData.parentTabId=0
        deletingData.tabId=0
        deletingData.tabName= this.productTemplate.name
        deletingData.tabContainerPublicName='product'
        break;
    }
    return deletingData
  }

  cancelModal(){
    if (this.hasUnsavedData()) {
      swal.fire({
        title: 'You have unsaved data',
        text: "Are you sure, you want to leave this page?",
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, cancel!',
        cancelButtonClass: 'btn btn-secondary'
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

  deleting(data: deletingDataInformation){
    switch (data.tabContainerPublicName ) {

      case 'step':
        this.productTemplate.processes[this.processToggleId].template.stepTemplates.splice(data.tabId, 1)
        break;
      case 'process':
        this.productTemplate.processes.splice(data.tabId, 1)
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
