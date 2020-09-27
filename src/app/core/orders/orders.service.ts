import { map } from 'rxjs/operators';
import { ProductTemplatesService } from './../productTemplates/product-templates.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { deprecate } from 'util';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public onOrdersChange: Observable<void>;

  private _orders: any[] = [
    {
      companyId: 'c0',
      id: 'o0',
      status: 'completed',
      name: 'Order 0',
      description: 'Order for customer 1',
      products: [
        {
          templateId: 'pt0',
          quantity: 1
        }
      ]
    },
    {
      companyId: 'c0',
      id: 'o1',
      status: 'completed',
      name: 'Order 1',
      description: 'Order for customer 2',
      products: [
        {
          templateId: 'pt0',
          quantity: 2
        }
      ]
    }
  ];

  constructor(private prodService: ProductTemplatesService) {
    if (!this.orders) {
      sessionStorage.setItem('orders', JSON.stringify(this._orders));
    }
  }

  get orders(): Order[] {
    const storage = sessionStorage.getItem('orders');
    if (!storage) {
      return null;
    }

    const orders = JSON.parse(storage);

    return orders.map((order) => {
      order.products = order.products.map((product) => {
        product.template = this.prodService.getById(product.templateId);
        return product;
      });
      return order;
    });
  }

  set orders(ordersOriginal: Order[]) {
    let orders: any = ordersOriginal;

    orders = orders.map((order) => {
      order.products = order.products.map((product) => {
        product.templateId = product.template.id;
        product.template = undefined;
        return product;
      });
      return order;
    });
    sessionStorage.setItem('orders', JSON.stringify(orders));
  }

  create(orderDraft: Order): Order {
    const id = uuidv4();
    this.orders = [ ...this.orders, { id, companyId: 'c0', ...orderDraft } ];
    return this.getById(id);
  }

  getAll(): Order[] {
    return this.orders;
  }

  getById(id: string) {
    return this.orders.find(order => order.id === id);
  }
}

/*productTemplates: [
          {
            name: 'Boat 3000',
            processes: [
              {
                name: 'Hull',
                mainTasks: ['Task1', 'Task2'],
                estimatedTime: 3600,
                steps: [
                  {
                    title: 'Inner Hull',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Wood'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Saw']
                  },
                  {
                    title: 'Outer Hull',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Metal'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Welder']
                  }
                ]
              },
              {
                name: 'Sail',
                mainTasks: ['Task1', 'Task2', 'Task3'],
                estimatedTime: 7000,
                steps: [
                  {
                    title: 'Cutting',
                    keyMessage: 'KeyMessage1\n KeyMessage2\n',
                    materials: ['Cloth', 'Strings'],
                    tasks: 'Task1\nTask2\n',
                    tools: ['Sewing Machine']
                  }
                ]
              }
            ]
          }
        ],*/
