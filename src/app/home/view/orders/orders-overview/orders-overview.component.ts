import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderNode } from 'src/app/models/ui';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { OrdersOverviewService } from './orders-overview.service';
import { SelectionType } from 'src/app/models/ui/table';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {
  orderNodes: OrderNode[];
  breadCrumbs: BreadCrumbInfo[]=[{name:"Order Overview", url: this.router.url },];
  entries: number = 10;
  temp: OrderNode[] = [];
  rows: any[] = []
  SelectionType = SelectionType;
  _showReleased: boolean=false;
  searchValue:string=""
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
    private ordersOverviewService: OrdersOverviewService
  ) { }

  ngOnInit(): void {
    this.orderNodes = this.ordersOverviewService.getAll();
    this.filterOrders()
    
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
    let val = this.searchValue;
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

}
