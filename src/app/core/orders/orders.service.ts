import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { v4 as uuidv4 } from 'uuid';
import { ProcessesService } from '../processes/processes.service';
import { ProductTempaltesService } from '../productTemplates/product-tempaltes.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

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

  constructor(private prodService: ProductTempaltesService ,
    private procService: ProcessesService) {
      //sessionStorage.setItem('orders', JSON.stringify([]));

     }
     get orders(): Order[] {
      const storage = sessionStorage.getItem('orders');
      if (!storage) {
        return null;
      }
  
      const orders = JSON.parse(storage);
  
      return orders.map((order) => {
        order.deliveryDate = new Date(order.deliveryDate)

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
        order.deliveryDate = new Date(order.deliveryDate)
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
      const index = this.orders.findIndex(order => order.id === orderEdited.id);
      const updatedOrders = this.orders;
  
      updatedOrders[index] = orderEdited;
      this.orders = updatedOrders;
      
      return this.getById(orderEdited.id);
    }
  
    create(orderDraft: Order) {
      orderDraft.id = uuidv4();
      orderDraft.companyId = 'c0';
  
      this.orders = [ ...this.orders, { ...orderDraft } ];
  
      return this.getById(orderDraft.id);
    }
  
    delete(id: string) {
      const index = this.orders.findIndex(order => order.id === id);
      this.orders = this.orders.splice(index, 1);
    }
  
    getAll(): Order[] {
      return this.orders;
    }
  
    getById(id: string) {
      return this.orders.find(order => order.id === id);
    }
  
    publish(id: string) {
      const index = this.orders.findIndex(order => order.id === id);
      const updatedOrders = this.orders;
  
      updatedOrders[index].status = 'released';
      this.procService.createForOrder(updatedOrders[index]);
  
      this.orders = updatedOrders;
  
      return this.getById(id);
    }
}
