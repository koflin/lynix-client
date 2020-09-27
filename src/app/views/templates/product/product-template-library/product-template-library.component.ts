import { ProductTemplateLibraryService } from './product-template-library.service';
import { ProductTemplateNode } from '../../../../models/ui/productTemplateNode';
import { ProductTemplatesService } from '../../../../core/productTemplates/product-templates.service';
import { ProductTemplate } from '../../../../models/productTemplate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-template-library',
  templateUrl: './product-template-library.component.html',
  styleUrls: ['./product-template-library.component.scss']
})
export class ProductTemplateLibraryComponent implements OnInit {

  templates: ProductTemplateNode[];

  constructor(private productTemplateLibraryService: ProductTemplateLibraryService) { }

  ngOnInit(): void {
    this.templates = this.productTemplateLibraryService.getAll();
  }

  onSelect(id: string) {
    this.templates.forEach((template) => {
      if (template.id === id) {
        template.selected = !template.selected;
      }
    });
  }
}
