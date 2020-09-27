import { ProcessTemplatesService } from '../../../../core/processTemplates/process-templates.service';
import { ProductTemplateNode } from '../../../../models/ui/productTemplateNode';
import { ProductTemplatesService } from '../../../../core/productTemplates/product-templates.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateLibraryService {

  constructor(
    private productTemplatesService: ProductTemplatesService,
    private processTemplatesService: ProcessTemplatesService) { }

  getAll(): ProductTemplateNode[] {
    return this.productTemplatesService.getAll().map((product) => {
      return {
        id: product.id,
        name: product.name,
        processes: product.processTemplates.map((process) => {
          return {
            id: process.id,
            name: process.name
          };
        }),
        selected: false
      };
    });
  }
}
