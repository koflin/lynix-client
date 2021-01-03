import { ApiService } from './../api/api.service';
import { ProcessesService } from './../processes/processes.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { v4 as uuidv4 } from 'uuid';
import { ProductTemplatesService } from '../productTemplates/product-tempaltes.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersChange: BehaviorSubject<string>;
  public onOrdersChange: Observable<string>;

  constructor(
    private api: ApiService,
    private prodService: ProductTemplatesService,
    private procService: ProcessesService,
  ) {
    this.ordersChange = new BehaviorSubject(null);
    this.onOrdersChange = this.ordersChange.asObservable();
  }

  save(order: Order){
    this.api.put<Order>('orders/' + order.id, order).subscribe(order => this.ordersChange.next(order.id));
  }

  create(orderDraft: Order) {
    return this.api.post<Order>('orders', orderDraft).pipe(map((order) => {
      this.ordersChange.next(order.id);
      return order.id;
    }));
  }

  delete(id: string) {
    this.api.delete('orders' + id).subscribe(() => this.ordersChange.next(id));
  }

  getAll() {
    return this.api.get<Order[]>('orders');
  }

  getById(id: string) {
    return this.api.get<Order>('orders/' + id);
  }

  publish(order: Order) {
    order.status = 'released';

    this.api.put('orders/' + order.id, order).subscribe(() => this.ordersChange.next(order.id));
  }
}
