import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { OrderNode } from 'src/app/models/ui';
import * as moment from 'moment';
import { flatMap } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrdersOverviewService {

  public onChange: Observable<OrderNode[]>;

  constructor(
    private ordersService: OrdersService,
    private processesService: ProcessesService) {
      this.onChange = this.ordersService.onOrdersChange.pipe(switchMap(() => {
        return this.getAll();
      }));
    }

  getAll(): Observable<OrderNode[]> {
    return this.ordersService.getAll().pipe(map((orders) => {
      return orders.map((order): OrderNode => {
        const processGroups: {
          id: string;
          quantityDone: number;
          quantityTotal: number;
          name: string;
        }[] = [];

        this.processesService.getByOrderId(order.id).subscribe(processes => {
          processes.forEach((process) => {
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
    }));
  }
}
