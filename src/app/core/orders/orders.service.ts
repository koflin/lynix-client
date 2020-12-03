import { ApiService } from './../api/api.service';
import { ProcessesService } from './../processes/processes.service';
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

  private ordersChange: BehaviorSubject<void>;
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

  constructor(
    private api: ApiService,
    private prodService: ProductTemplatesService,
    private procService: ProcessesService) {
  }

  get orders(): Order[] {
    const storage = sessionStorage.getItem('orders');
    if (!storage) {
      return null;
    }

    const orders = JSON.parse(storage);

    return orders.map((order) => {
      order.products = order.products.map((product) => {
        if (product.templateId) {
          product.template = this.prodService.getById(product.templateId);
        }
        return product;
      });
      return order;
    });
  }

  set orders(ordersOriginal: Order[]) {
    let orders: any = [...ordersOriginal];

    orders = orders.map((order) => {
      order.products = order.products.map((product) => {
        if (product.template) {
          product.templateId = product.template.id;
        }
        return product;
      });
      return order;
    });
    sessionStorage.setItem('orders', JSON.stringify(orders));
  }

  save(orderEdited: Order) {
    //this.api.put('orders/' + orderEdited.id, orderEdited).subscribe(() => this.ordersChange.next());
    return null;
  }

  create(orderDraft: Order) {
    orderDraft.companyId = 'c0';

    this.api.post('orders', orderDraft).subscribe(() => this.ordersChange.next());
    return null;
  }

  delete(id: string) {
    this.api.delte('orders/' + id).subscribe(() => this.ordersChange.next());
    return null;
  }

  getAll() {
    //return this.api.get('orders?_expand=');
    return null;
  }

  getById(id: string) {
    //return this.api.get<Order>('orders/' + id);
    return null;
  }

  /*publish(order: Order) {
    order.status = 'released';

    this.api.put('orders/' + order.id, order);
    return null;
  }*/
  publish(id: string) {
    return null;
  }
}
