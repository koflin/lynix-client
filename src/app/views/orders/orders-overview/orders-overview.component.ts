import { OrdersService } from './../../../core/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {

  orders: Order[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.getAll();
  }

}
