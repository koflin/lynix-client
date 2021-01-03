import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { Order } from 'src/app/models/order';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { InputOutputValue } from 'src/app/shared/models/InputOutputValue';
import swal from 'sweetalert2';
import {deletingDataInformation} from 'src/app/models/ui/deletingData'
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
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
export class OrdersDraftComponent implements OnInit {
  _orderDraft: Order;
  get orderDraft():Order{
    return this._orderDraft
  }
  set orderDraft(value:Order){
    this._orderDraft = value
    this.setProductNames()

  }
  breadCrumbs: BreadCrumbInfo[] = [{name:"Order Overview", url: "/orders/overview"}, {name:"Order Draft", url: this.router.url },];

  //productsNames:string[]=[]
  get productsNames():string[]{
    return this.orderDraft.products.filter((p) => {
      return p.template
    })
    .map((product)=>{
      return product.template.name
    })
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
  set stepToggleId(value){
    this._stepToggleId=value
  }

  _processToggleId:number
  get processToggleId(){
    return this._processToggleId
  }
  set processToggleId(value){
    this.stepToggleId=undefined
    this._processToggleId=value
  }
  _productToggleId:number
  get productToggleId(){

    return this._productToggleId
  }
  set productToggleId(value){
    console.log(value)
    this._productToggleId=value
    this.stepToggleId=undefined
    this.processToggleId=undefined
  }


  isEdited: false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private processTemplatesService: ProcessTemplatesService,
    private productTemplatesService: ProductTemplatesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.ordersService.getById(id).subscribe(draft => {
          this.orderDraft = draft;
        });
      } else {
        this.orderDraft = {
          companyId: null,
          id: null,
          name: 'Unnamed',
          description: '',
          products: [],
          status: 'in_preparation',
          deliveryDate: undefined
        };
        //this.insertDummyData();
      }

      //this.productsNames=['d', 'd', 'd', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd','d', 'd']



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

  overallInformation(){
    this.processToggleId=undefined
    this.productToggleId=undefined
    this.stepToggleId=undefined
  }


  discardDraft() {
    // Ask if really want to discard changes
    this.router.navigate(['orders/overview']);
  }

  saveDraft(dontFireModal:boolean=false) {
    for (const product of this.orderDraft.products) {
      if (product.template) {
        for (const process of product.template.processes) {
          this.processTemplatesService.save(process.template);
        }
        this.productTemplatesService.save(product.template);
      }
    }

    if (this.orderDraft.id) {
      this.ordersService.save(this.orderDraft);
    } else {
      const id = this.ordersService.create(this.orderDraft);
      this.router.navigate(['orders/draft/' + id]);
    }

    this.isEdited = false;
    this.saveModal(dontFireModal)
  }

  deleteDraft() {
    this.ordersService.delete(this.orderDraft.id);
    this.saveDraft();

    this.router.navigate(['orders/overview']);
    //after deleting app should save()
  }

  publishDraft() {
    this.saveDraft(true);
    this.ordersService.publish(this.orderDraft);
    this.router.navigate(['orders/overview']);
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
    swal.fire({
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
      }
  })
  }
  saveModal(dontFireModal:boolean=false){
    if (!dontFireModal) {
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
          this.router.navigate(['orders/overview']);
      }
    })
    }

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
          this.stepToggleId=data.tabId-1
        }else{
          this.processToggleId=data.parentTabId
        }
        this.orderDraft.products[this.productToggleId].template.processes[this.processToggleId].template.stepTemplates.splice(data.tabId, 1)
        break;
      case 'process':
        if (data.tabId>0) {
          this.processToggleId=data.tabId-1
        }else{
          this.productToggleId=data.parentTabId
        }
        this.orderDraft.products[this.productToggleId].template.processes.splice(data.tabId, 1)

        break;
      case 'product':
          if (data.tabId>0) {
            this.productToggleId=data.tabId-1
          }else{
            this.overallInformation()
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
      case 'processes':
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
  s(){
    console.log(this.orderDraft)
  }




}

