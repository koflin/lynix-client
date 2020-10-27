import { ProcessTemplatesService } from './../../../core/processTemplates/process-templates.service';
import { ProductTemplatesService } from './../../../core/productTemplates/product-templates.service';
import { ProductTemplateSelectionComponent } from './../../../components/product-template-selection/product-template-selection.component';
import { OrdersService } from './../../../core/orders/orders.service';
import { Order } from './../../../models/order';
import { Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-draft',
  templateUrl: './orders-draft.component.html',
  styleUrls: ['./orders-draft.component.scss']
})
export class OrdersDraftComponent implements OnInit, DoCheck {

  orderDraft: Order;

  isEdited: false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private productTemplatesService: ProductTemplatesService,
    private processTemplatesService: ProcessTemplatesService,
    public dialog: MatDialog) { }

  ngDoCheck(): void {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.orderDraft = this.ordersService.getById(id);
      } else {
        this.orderDraft = {
          companyId: null,
          id: null,
          name: 'Unnamed',
          description: '',
          products: [],
          status: 'in_preparation'
        };
        //this.insertDummyData();
      }
    });
  }

  discardDraft() {
    // Ask if really want to discard changes
    this.router.navigate(['orders/overview']);
  }

  saveDraft() {
    for (const product of this.orderDraft.products) {
      if (product.template) {
        for (const process of product.template.processes) {
          this.processTemplatesService.save(process.template);
        }
        this.productTemplatesService.save(product.template);
      }
    }

    if (this.orderDraft.id) {
      this.orderDraft = this.ordersService.save(this.orderDraft);
    } else {
      const id = this.ordersService.create(this.orderDraft).id;
      this.router.navigate(['orders/draft/' + id]);
    }

    this.isEdited = false;
  }

  deleteDraft() {
    this.ordersService.delete(this.orderDraft.id);
    this.router.navigate(['orders/overview']);
  }

  publishDraft() {
    this.saveDraft();
    this.ordersService.publish(this.orderDraft.id);
    this.router.navigate(['orders/overview']);
  }
}
