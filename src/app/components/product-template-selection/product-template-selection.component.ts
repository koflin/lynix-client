import { ProductTemplate } from './../../models/productTemplate';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-template-selection',
  templateUrl: './product-template-selection.component.html',
  styleUrls: ['./product-template-selection.component.scss']
})
export class ProductTemplateSelectionComponent implements OnInit {
  products: ProductTemplate[];
  selectedProduct: ProductTemplate;

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
}
