import { Injectable } from '@angular/core';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { ProductTempaltesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { OrderNode } from 'src/app/models/ui';

@Injectable({
  providedIn: 'root'
})
export class OrdersOverviewService {

  constructor(private ordersService: OrdersService,
    private productTemplateService: ProductTempaltesService ,
    private processesService: ProcessesService) { }
  
  getAll(): OrderNode[] {
    return this.ordersService.getAll().map((order): OrderNode => {
      const processGroups: {
        id: string;
        quantityDone: number;
        quantityTotal: number;
        name: string;
      }[] = [];

      this.processesService.getByOrderId(order.id).forEach((process) => {
        const group = processGroups.find(g =>  g.id === process.template.id);
        const done = process.status === 'completed' ? 1 : 0;

        if (group) {
          group.quantityDone += done;
          group.quantityTotal += 1;
        } else {
          processGroups.push({
            id: process.template.id,
            quantityDone: done,
            quantityTotal: 1,
            name: process.name
          });
        }
      });

      return {
        workOderId: order.id,
        name: order.name,
        status: order.status,
        deliveryDate: order.deliveryDate,
        products: order.products.map((product) => {
          return {
            name: product.template?.name,
            quantity: product.quantity
          };
        }),
        processGroups
      };
    });
  }
}
