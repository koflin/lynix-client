import { ProductTemplate } from './../../models/productTemplate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplatesService {

  private productTemplates: ProductTemplate[] = [
    {
      companyId: 'c0',
      id: 'pt0',
      name: 'Boot 3000',
      processTemplatIds: ['pt0', 'pt1']
    }
  ];

  constructor() { }

  getAll(): ProductTemplate[] {
    return this.productTemplates;
  }

  getById(id: string) {
    return this.productTemplates.find((template) => template.id === id);
  }
}
