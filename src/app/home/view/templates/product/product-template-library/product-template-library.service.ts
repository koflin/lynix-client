import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { ProcessTemplateNode } from 'src/app/models/ui/processTemplateNode';
import { ProductTemplateNode } from 'src/app/models/ui/productTemplateNode';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateLibraryService {

  constructor(private productTemplatesService: ProductTemplatesService ) { }
  getAll() {
    return this.productTemplatesService.getAll().pipe(map(products => {
      return products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          processes: product.processes.map((process): ProcessTemplateNode => {
            const processT = process.template;

            return {
              id: processT.id,
              name: processT.name,
              quantity: process.quantity,
              description: null,
              stepNames: process.template.steps.map(step => step.title),
              createdAt: processT.createdAt,
              createdBy: processT.createdBy?.displayName,
              editedAt: processT.editedAt,
              editedBy: processT.editedBy?.displayName,
              selected: false,
            };
          }),
          selected: false
        } as ProductTemplateNode;
      });
    }));
  }
}
