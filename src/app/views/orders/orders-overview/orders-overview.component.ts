import { Router } from '@angular/router';
import { OrderNode } from './../../../models/ui/orderNode';
import { OrdersService } from './../../../core/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersOverviewService } from './orders-overview.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {

  orderNodes: OrderNode[];

  constructor(
    private router: Router,
    private ordersOverviewService: OrdersOverviewService
    ) { }

  ngOnInit(): void {
    this.orderNodes = this.ordersOverviewService.getAll();
  }

  edit(id: string) {
    this.router.navigate(['orders/draft/' + id]);
  }
}
