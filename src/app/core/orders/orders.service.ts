import { ApiService } from './../api/api.service';
import { ProcessesService } from './../processes/processes.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { v4 as uuidv4 } from 'uuid';
import { ProductTemplatesService } from '../productTemplates/product-tempaltes.service';
import { EditOrderDto } from 'src/app/dto/order/editOrderDto';
import { EventsService } from '../events/events.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersChange: BehaviorSubject<string>;
  public onOrdersChange: Observable<string>;

  constructor(
    private api: ApiService,
    private socket: Socket,
    private prodService: ProductTemplatesService,
    private procService: ProcessesService,
  ) {
    this.ordersChange = new BehaviorSubject(null);

    //this.onOrdersChange = this.socket.fromEvent<Order>('ORDER_CREATE');
    console.log('TEST');
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
