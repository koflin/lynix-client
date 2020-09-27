import { ProductTemplateNode } from './../../models/ui/productTemplateNode';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-template-node',
  templateUrl: './product-template-node.component.html',
  styleUrls: ['./product-template-node.component.scss']
})
export class ProductTemplateNodeComponent implements OnInit {

  @Input() templateNode: ProductTemplateNode;
  @Output() selectChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    alert('Not implemented yet');
  }

  select() {
    this.selectChange.emit(!this.templateNode.selected);
  }
}
