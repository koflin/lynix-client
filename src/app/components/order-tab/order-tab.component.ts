import { Order } from './../../models/order';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, DoCheck } from '@angular/core';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-templates.service';
import { ProductTemplateSelectionComponent } from '../product-template-selection/product-template-selection.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-tab',
  templateUrl: './order-tab.component.html',
  styleUrls: ['./order-tab.component.scss']
})
export class OrderTabComponent implements OnInit, DoCheck {

  selectedTab = 0;
  subSelect = 0;

  @Input() orderDraft: Order;
  @Output() orderDraftChange = new EventEmitter<Order>();

  constructor(
    public dialog: MatDialog,
    private productTemplatesService: ProductTemplatesService) { }

  ngDoCheck() {
    //this.orderDraftChange.emit(this.orderDraft);
  }

  ngOnInit(): void {
  }

  selectTab(index: number) {
    this.selectedTab = index;
    this.subSelect = 0;
  }

  addProduct() {
    this.orderDraft.products.push({
      quantity: 1,
      template: null,
    });
  }

  removeProduct(index: number) {
    this.orderDraft.products.splice(index, 1);
  }

  editProduct(index: number) {
    this.selectedTab = index + 1;
  }

  selectProduct(index: number) {
    // Filter non selected product templates
    const options = this.productTemplatesService.getAll().filter((product) => {
      return this.orderDraft.products.findIndex(productUsed => productUsed.template && productUsed.template.id === product.id) === -1;
    });

    const selectDialog = this.dialog.open(ProductTemplateSelectionComponent, {
      width: '700px',
      data: {
        options
      }
    });

    selectDialog.afterClosed().subscribe(result => {
      // New product
      if (result === true) {
        this.orderDraft.products[index].template = this.productTemplatesService.create(
          {
            companyId: null,
            id: null,
            name: 'Unnamed Product ' + (index + 1),
            processTemplates: [],
          }
        );

      } else if (result) {
        this.orderDraft.products[index].template = this.productTemplatesService.getById(result);
      }
    });
  }
}
