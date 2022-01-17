import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { OrderStatus } from 'src/app/models/order';
import { Permission } from 'src/app/models/role';
import { OrderNode } from 'src/app/models/ui';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { SelectionType } from 'src/app/models/ui/table';
import swal from 'sweetalert2';

import { OrdersOverviewService } from './orders-overview.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {
  permissions = Permission;

  orderNodes: OrderNode[];
  breadCrumbs: BreadCrumbInfo[]=[{ name: $localize `Orders`, url: new RouteInfo(this.router.url) },];
  entries: number = 5;
  temp: OrderNode[] = [];
  rows: any[] = []
  SelectionType = SelectionType;
  _showReleased: boolean=true;
  searchValue:string=""

  OrderStatus = OrderStatus;

  get showReleased(): boolean {
      return this._showReleased;
  }
  set showReleased(value: boolean) {
      this._showReleased = value
      this.filterOrders()
  }

  @ViewChild('myTable') table: any;
  constructor(
    private router: Router,
    private ordersOverviewService: OrdersOverviewService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersOverviewService.onChange.subscribe(nodes => {
      this.orderNodes = nodes;
      this.filterOrders();
    })
  }

  filterOrders(): void {
    this.temp = this.orderNodes
    .filter(f => ((f.status != 'released' && this.showReleased == false) || (this.showReleased==true) ) )
    .map((prop, key) => {

        return {
          ...prop,
          id: key
        };


    });
  }

  edit(id: string) {
    this.router.navigate(['orders/draft/' + id]);
  }

  onActivate($event){
    if ($event.type=="click") {
      this.toggleExpandRow($event.row)
    }
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = this.searchValue.toLowerCase();
    this.temp = this.orderNodes.filter(function(d) {
      for (let key in d) {
        if (typeof d[key]=== 'string') {
          if (d[key].toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }

      }
      return false;
    }).filter(f => ((f.status != 'released' && this.showReleased == false) ||
      (this.showReleased==true) ) ).map((prop, key) => {

      return {
        ...prop,
        id: key
      };
    })
  }


  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  deleteModal(order: OrderNode){
    swal.fire({
      title: $localize `Are you sure to delete order '${order.name}'?`,
      text: $localize `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: $localize `Yes, delete!`,
      cancelButtonClass: 'btn btn-secondary',
      cancelButtonText: $localize `Cancel`
    }).then((result) => {
      if (result.value) {
        this.ordersService.delete(order.workOderId).subscribe(() => {
          const index = this.temp.findIndex(o => order.workOderId == o.workOderId)
          this.temp.splice(index, 1);
          this.orderNodes.splice(index, 1);
        });
      }
    })
  }
}
