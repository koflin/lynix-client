import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { Order } from 'src/app/models/order';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { deletingDataInformation } from 'src/app/models/ui/deletingData';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
import swal from 'sweetalert2';

import { ProcessesService } from './../../../../core/processes/processes.service';

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
  selector: 'app-orders-draft',
  templateUrl: './orders-draft.component.html',
  styleUrls: ['./orders-draft.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class OrdersDraftComponent implements OnInit, HasUnsavedData {
  _orderDraft: Order;
  get orderDraft():Order{
    return this._orderDraft;
  }
  set orderDraft(value:Order){
    this._orderDraft = value;
    this.setProductNames()

  }
  breadCrumbs: BreadCrumbInfo[] = [{name:"Order Overview", url: "/orders/overview"}, {name:"Order Draft", url: this.router.url },];

  //productsNames:string[]=[]
  get productsNames():string[]{
    return this.orderDraft ? this.orderDraft.products.filter((p) => {
      return p.template
    })
    .map((product)=>{
      return product.template.name
    }) : [];
  }
  _processesNames:string[]=[]
  get processesNames():string[]{
    if (this.productToggleId != undefined) {
      return this.orderDraft.products[this.productToggleId].template.processes.filter((p) => {
        return p.template
      }).map((process)=>{
        return process.template.name
      })
    }
    return []

  }
  _stepsName:string[]=[]
  get stepsName():string[]{
    if (this.processToggleId != undefined && this.productToggleId != undefined) {
      return this.orderDraft.products[this.productToggleId].template.processes[this.processToggleId].template.stepTemplates.filter((p) => {
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

  _productToggleId:number
  get productToggleId(){

    return this._productToggleId
  }

  isEdited = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private processTemplatesService: ProcessTemplatesService,
    private productTemplatesService: ProductTemplatesService,
    private authService: AuthService,
    private processService: ProcessesService,
    private toastr: ToastrService,
  ) { }

  hasUnsavedData(): boolean {
    return this.isEdited;
  }

  detectChange() {
    this.isEdited = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.getOrder(id);
      } else {
        this.orderDraft = {
          companyId: this.authService.getLocalUser().companyId,
          id: undefined,
          name: 'Unnamed',
          description: undefined,
          products: [],
          status: 'in_preparation',
          deliveryDate: new Date()
        };

        this.isEdited = false;
      }

    });

    this.route.fragment.subscribe((fragment) => {
      this._productToggleId = undefined;
        this._processToggleId = undefined;
        this._stepToggleId = undefined;

      if (!fragment) {
        return;
      }

      const parts = fragment.split('.');

      if (parts.length >= 1) {
        this._productToggleId = parseInt(parts[0]);
      }

      if (parts.length >= 2) {
        this._processToggleId = parseInt(parts[1]);
      }

      if (parts.length >= 3) {
        this._stepToggleId = parseInt(parts[2]);
      }
    });
  }

  toFragment(prod?: number, proc?: number, step?: number) {
    let frag = '';

    frag += prod != undefined ? prod.toString() : '';
    frag += proc != undefined ? '.' + proc.toString(): '';
    frag += step != undefined ? '.' + step.toString(): '';

    return frag;
  }

  getOrder(id: string) {
    this.ordersService.getById(id).subscribe(draft => {
      this.orderDraft = draft;
      this.isEdited = false;
    });
  }

  setProductNames(){
    /* this.productsNames = this.orderDraft.products.filter((p) => {
      return p.template
    })
    .map((product)=>{
      return product.template.name
    }) */
  }


  discardDraft() {
    // Ask if really want to discard changes
    this.router.navigate(['orders/overview']);
  }

  async saveDraft(dontFireToastr:boolean=false) {
    for (let i = 0; i < this.orderDraft.products.length; i++) {
      const product = this.orderDraft.products[i];

      for (let j = 0; j < product.template.processes.length; j++) {
        const process = product.template.processes[j];

        if (process.template.id) {
          this.processTemplatesService.save(process.template);
        } else {
          process.template = await this.processTemplatesService.create(process.template).toPromise();
        }
      }

      if (product.template.id) {
        this.productTemplatesService.save(product.template);
      } else {
        product.template = await this.productTemplatesService.create(product.template).toPromise();
      }
    }

    if (this.orderDraft && this.orderDraft.id) {
      this.ordersService.save(this.orderDraft);
    } else {
      const fragment = this.toFragment(this.productToggleId, this.processToggleId, this.stepToggleId);

      this.ordersService.create(this.orderDraft).subscribe(id => this.router.navigate(['orders/draft/' + id], { fragment }));
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

  deleteDraft() {
    this.ordersService.delete(this.orderDraft.id).subscribe(() => this.router.navigate(['orders/overview']));
    //after deleting app should save()
  }

  publishDraft() {
    this.orderDraft.status = 'released';
    this.saveDraft(true).then(() => {
      this.processService.createForOrder(this.orderDraft).then(() => {
        this.toastr.show(
          '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">Success</span> <span>Published</span></div>',
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

        this.router.navigate(['orders/overview']);
      });
    });
  }

  defContainer(){
    if (this.stepToggleId!=undefined) {
      return 'step'
    }else if (this.processToggleId != undefined) {
      return 'process'
    } else if(this.productToggleId != undefined){
      return 'product'
    }else{
      return 'order'
    }
  }
  cancelModal(){
    /*swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, cancel!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
          // Show confirmation
          this.discardDraft()
          this.isEdited = false;
      }
    })*/

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
            this.discardDraft()
            this.isEdited = false;
        }
      })
    } else {
      this.discardDraft()
    }
  }
  saveModal(dontFireModal:boolean=false){
    /*if (!dontFireModal) {
      swal.fire({
        title: 'Back to overview?',
        text: 'Do you want go to overview of order? Please remember you have to publish later in order ...',
        type: 'success',
        showCancelButton: true,
        showConfirmButton:true,
        buttonsStyling: false,
        confirmButtonText: 'Yes',
        cancelButtonClass: 'btn btn-secondary',
        confirmButtonClass: 'btn btn-default',
        cancelButtonText:'No'
    }).then((result) => {
      if (result.value) {
          // Show confirmation
          this.router.navigate(['hopme/orders/overview']);
      }
    })
    }*/

  }
  publishModal(){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to edit this order!",
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: 'Yes, publish!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
          // Show confirmation
          this.publishDraft()
      }
  })
  }
  deleteModal(){
    let data: deletingDataInformation = this.specificDeleteData()

    console.log(data);

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

  deleting(data: deletingDataInformation){
    switch (data.tabContainerPublicName ) {

      case 'step':
        if (data.tabId>0) {
          //this.stepToggleId=data.tabId-1
        }else{
          //this.processToggleId=data.parentTabId
        }
        this.orderDraft.products[this.productToggleId].template.processes[this.processToggleId].template.stepTemplates.splice(data.tabId, 1)
        break;
      case 'process':
        if (data.tabId>0) {
          //this.processToggleId=data.tabId-1
        }else{
          //this.productToggleId=data.parentTabId
        }
        this.orderDraft.products[this.productToggleId].template.processes.splice(data.tabId, 1)

        break;
      case 'product':
          if (data.tabId>0) {
            //this.productToggleId=data.tabId-1
          }else{
            //this.overallInformation()
          }
          this.orderDraft.products.splice(data.tabId, 1)

          break;
      default:
        this.deleteDraft()
        break;
    }

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
        deletingData.parentTabId=this.productToggleId
        deletingData.tabId=this.processToggleId
        deletingData.tabName= this.processesNames[this.processToggleId]
        deletingData.tabContainerPublicName='process'
        break;
      case 'product':
        deletingData.parentTabId=0
        deletingData.tabId=this.productToggleId
        deletingData.tabName= this.productsNames[this.productToggleId]
        deletingData.tabContainerPublicName='product'
        break;
      default:
        deletingData.parentTabId=undefined
        deletingData.tabId=0
        deletingData.tabName= this.orderDraft.name
        deletingData.tabContainerPublicName='order'
        break;
    }
    return deletingData
  }

  addStep() {
    const steps = this.orderDraft.products[this.productToggleId].template.processes[this.processToggleId].template.stepTemplates;
    steps.push({
      title: 'Unnamed Step ' + (steps.length+1),
      keyMessage: null,
      tasks: null,
      materials: [],
      toolIds: [],
      pictureUris: [],
      videoUris: [],
      estimatedTime: 0,
    });
  }
}

