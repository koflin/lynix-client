import { ProcessTemplateNode } from './../../../../models/ui/processTemplateNode';
import { ProcessTemplate } from './../../../../models/processTemplate';
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
        processes: product.processes.map((process): ProcessTemplateNode => {
          const processT = process.template;

          return {
            id: processT.id,
            name: processT.name,
            description: null,
            selected: false,
          };
        }),
        selected: false
      };
    });
  }
}
