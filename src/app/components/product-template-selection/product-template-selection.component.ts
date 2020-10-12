import { ProductTemplate } from './../../models/productTemplate';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-product-template-selection',
  templateUrl: './product-template-selection.component.html',
  styleUrls: ['./product-template-selection.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductTemplateSelectionComponent implements OnInit {
  products: ProductTemplate[];
  selectedProductId: string;

  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: MatTableDataSource<ProductTemplate>;
  filter: string;

  constructor(
    public dialogRef: MatDialogRef<ProductTemplateSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { options: ProductTemplate[] }
    ) {
      this.products = this.data.options;
      this.dataSource = new MatTableDataSource(this.products);
    }

  ngOnInit(): void {
  }

  applyFilter() {
    this.dataSource.filter = this.filter;
  }

  selectProduct(id: string) {
    if (this.selectedProductId === id) {
      this.selectedProductId = null;
    } else {
      this.selectedProductId = id;
    }
  }
}
