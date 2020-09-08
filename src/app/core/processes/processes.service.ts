import { Injectable } from '@angular/core';
import { Process } from 'src/app/models/process';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  private processes: BehaviorSubject<Process[]>;
  public onProcessesChange: Observable<Process[]>;

  constructor(private ordersService: OrdersService) {
    this.processes = new BehaviorSubject(undefined);
    this.onProcessesChange = this.processes.asObservable();

    this.processes = [].concat.apply([], ordersService.getAll().map((order) => order.processes));
  }

  getAll() {
    return this.processes.value;
  }
}
