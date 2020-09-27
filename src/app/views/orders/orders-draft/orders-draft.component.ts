import { ProductTemplatesService } from './../../../core/productTemplates/product-templates.service';
import { ProductTemplateSelectionComponent } from './../../../components/product-template-selection/product-template-selection.component';
import { OrdersService } from './../../../core/orders/orders.service';
import { Order } from './../../../models/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-draft',
  templateUrl: './orders-draft.component.html',
  styleUrls: ['./orders-draft.component.scss']
})
export class OrdersDraftComponent implements OnInit {

  selectedTab = 0;
  subSelect = 0;

  isFresh = false;
  orderDraft: Order;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private productTemplatesService: ProductTemplatesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.orderDraft = this.ordersService.getById(id);
      } else {
        /*this.orderDraft = {
          companyId: null,
          id: null,
          name: 'Unnamed',
          description: '',
          products: [],
          status: 'in_preparation'
        };*/
        this.insertDummyData();
      }
    });
  }

  create() {
    const id = this.ordersService.create(this.orderDraft);
    this.router.navigate(['orders/draft/' + id]);
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
      data: options
    });

    selectDialog.afterClosed().subscribe(result => {
      // New product
      if (result === true) {
        this.orderDraft.products[index].template = {
          companyId: null,
          id: null,
          name: 'Unnamed Product ' + (index + 1),
          processTemplates: [],
        };
      } else if (result) {
        this.orderDraft.products[index].template = this.productTemplatesService.getById(result);
      }
    });
  }

  selectTab(index: number) {
    this.selectedTab = index;
    this.subSelect = 0;
  }

  private insertDummyData() {
    this.orderDraft = {
      companyId: null,
      id: null,
      name: 'Order: Mr. Mueller',
      description: '',
      products: [
        {
          quantity: 1,
          template: {
            id: null,
            companyId: null,
            name: 'Boat 1000',
            processTemplates: [
              {
                id: null,
                companyId: null,
                name: 'Sail',
                estimatedTime: 3000,
                mainTasks: ['Task 1', 'Task 2'],
                previousComments: ['Test Comment'],
                stepTemplates: [
                  {
                    title: 'Step 1',
                    keyMessage: 'Key message 1',
                    tasks: 'Task1\nTask2',
                    materials: ['drill', 'saw'],
                    toolIds: [],
                    pictureUris: ['https://www.flightsails.com/assets/images/zorro_s.png'],
                    videoUris: []
                  }
                ]
              }
            ]
          }
        }
      ],
      status: 'in_preparation'
    };
  }
}
