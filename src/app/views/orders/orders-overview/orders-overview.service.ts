import { ProcessTemplate } from './../../../models/processTemplate';
import { ProductTemplatesService } from './../../../core/productTemplates/product-templates.service';
import { OrderNode } from './../../../models/ui/orderNode';
import { ProcessesService } from './../../../core/processes/processes.service';
import { OrdersService } from './../../../core/orders/orders.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersOverviewService {

  constructor(
    private ordersService: OrdersService,
    private productTemplateService: ProductTemplatesService,
    private processesService: ProcessesService) {

  }

  getAll(): OrderNode[] {
    return this.ordersService.getAll().map((order): OrderNode => {
      const processGroups: {
        id: string;
        quantityDone: number;
        quantityTotal: number;
        name: string;
      }[] = [];

      this.processesService.getByOrderId(order.id).forEach((process) => {
        const group = processGroups.find(g =>  g.id === process.templateId);
        const done = process.status === 'completed' ? 1 : 0;

        if (group) {
          group.quantityDone += done;
          group.quantityTotal += 1;
        } else {
          processGroups.push({
            id: process.templateId,
            quantityDone: done,
            quantityTotal: 1,
            name: process.name
          });
        }
      });

      return {
        workOderId: order.id,
        products: order.products.map((product) => {
          const template = this.productTemplateService.getById(product.templateId);

          return {
            name: template.name,
            quantity: product.quantity
          };
        }),
        processGroups
      };
    });
  }
}
