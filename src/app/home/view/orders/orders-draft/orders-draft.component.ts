import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { Order } from 'src/app/models/order';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ComponentInfo } from 'src/app/models/ui/componentInfo';
import { ComponentType } from 'src/app/models/ui/componentType';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
import { TabFragmentPipe } from 'src/app/pipes/tab/tab-fragment.pipe';
import { TabIndicesPipe } from 'src/app/pipes/tab/tab-indices.pipe';
import swal from 'sweetalert2';

import { ProcessesService } from './../../../../core/processes/processes.service';

@Component({
  selector: 'app-orders-draft',
  templateUrl: './orders-draft.component.html',
  styleUrls: ['./orders-draft.component.scss']
})
export class OrdersDraftComponent implements OnInit, HasUnsavedData {
  orderDraft: Order;
  breadCrumbs: BreadCrumbInfo[] = [];

  isEdited = false;

  productToggleIndex: number;
  processToggleIndex: number;
  stepToggleIndex: number;

  currentComponent: ComponentInfo;

  ComponentType = ComponentType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private processTemplatesService: ProcessTemplatesService,
    private productTemplatesService: ProductTemplatesService,
    private authService: AuthService,
    private processService: ProcessesService,
    private toastr: ToastrService,
    private fragPipe: TabFragmentPipe,
    private indicesPipe: TabIndicesPipe,
    private cref: ChangeDetectorRef
  ) { }

  updateBreadCrumb(subBreadcrumbs: BreadCrumbInfo[]) {
    this.breadCrumbs = [{
      name: $localize `Orders`,
      url: new RouteInfo("/orders/overview")
    }, {
      name: this.orderDraft?.name ? this.orderDraft.name : $localize `New`,
      url: new RouteInfo(this.router.url.split('#')[0])
    }, ...subBreadcrumbs];

    this.cref.detectChanges();
  }

  hasUnsavedData(): boolean {
    return this.isEdited;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');

      if (id) {
        this.orderDraft = await this.ordersService.getById(id).toPromise();
      } else {
        this.orderDraft = {
          companyId: this.authService.getLocalUser().companyId,
          id: undefined,
          name: $localize `Unnamed Order`,
          description: undefined,
          products: [],
          status: 'in_preparation',
          deliveryDate: new Date()
        };
      }

      this.isEdited = false;
    });
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
      this.ordersService.create(this.orderDraft).subscribe(id => this.router.navigate(['orders/draft/' + id], { preserveFragment: true }));
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

  deleteDraft() {
    this.ordersService.delete(this.orderDraft.id).subscribe(() => this.router.navigate(['orders/overview']));
    //after deleting app should save()
  }

  publishDraft() {
    this.orderDraft.status = 'released';
    this.saveDraft(true).then(() => {
      this.processService.createForOrder(this.orderDraft).then(() => {
        this.toastr.show(
          '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
          + $localize `Success` + '</span> <span>' + $localize `Published` + '</span></div>',
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
            this.discardDraft()
            this.isEdited = false;
        }
      })
    } else {
      this.discardDraft()
    }
  }
  publishModal(){
    swal.fire({
      title: $localize `Are you sure?`,
      text: $localize `You won't be able to edit this order!`,
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: $localize `Yes, publish!`,
      cancelButtonClass: 'btn btn-secondary',
      cancelButtonText: $localize `Cancel`
    }).then((result) => {
      if (result.value) {
          // Show confirmation
          this.publishDraft()
      }
  })
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

  deleting(data: ComponentInfo){
    switch (data.type ) {
      case ComponentType.step:
        this.orderDraft.products[this.productToggleIndex].template.processes[this.processToggleIndex].template.steps.splice(data.index, 1)
        break;
      case ComponentType.process:
        this.orderDraft.products[this.productToggleIndex].template.processes.splice(data.index, 1)
        break;
      case ComponentType.product:
        this.orderDraft.products.splice(data.index, 1)
        break;
      default:
        this.deleteDraft()
        break;
    }

  }

  addStep() {
    const steps = this.orderDraft?.products[this.productToggleIndex].template?.processes[this.processToggleIndex].template?.steps;

    steps.push({
      title: $localize `Unnamed Step` + ' ' + (steps.length+1),
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

