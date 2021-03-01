import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditOrderDto } from 'src/app/dto/order/editOrderDto';
import { Order } from 'src/app/models/order';

import { ApiService } from './../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersChange: BehaviorSubject<string>;
  public onOrdersChange: Observable<string>;

  constructor(
    private api: ApiService,
  ) {
    this.ordersChange = new BehaviorSubject(null);
    this.onOrdersChange = this.ordersChange.asObservable();
  }

  save(order: Order){
    this.api.put<Order>('orders/' + order.id, new EditOrderDto(order)).subscribe(order => this.ordersChange.next(order.id));
  }

  create(orderDraft: Order) {
    return this.api.post<Order>('orders', new EditOrderDto(orderDraft)).pipe(map((order) => {
      this.ordersChange.next(order.id);
      return order.id;
    }));
  }

  delete(id: string) {
    this.api.delete('orders/' + id).subscribe(() => this.ordersChange.next(id));
  }

  getAll() {
    return this.api.get<Order[]>('orders');
  }

  getById(id: string) {
    return this.api.get<Order>('orders/' + id);
  }
}
