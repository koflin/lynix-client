import { ProcessTemplatesService } from './../processTemplates/process-templates.service';
import { map } from 'rxjs/operators';
import { ProductTemplate } from './../../models/productTemplate';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplatesService {

  private _productTemplates: any[] = [
    {
      companyId: 'c0',
      id: 'pt0',
      name: 'Boot 3000',
      processTemplateIds: ['pt0']
    }
  ];

  constructor(private processTemplatesService: ProcessTemplatesService) {
    if (!this.productTemplates) {
      sessionStorage.setItem('productTemplates', JSON.stringify(this._productTemplates));
    }
  }

  get productTemplates(): ProductTemplate[] {
    const storage = sessionStorage.getItem('productTemplates');
    if (!storage) {
      return null;
    }

    const products = JSON.parse(storage);

    return products.map((product) => {
      product.processTemplates = [];

      product.processTemplateIds.forEach((id) => {
        product.processTemplates.push(this.processTemplatesService.getById(id));
      });
      return product;
    });
  }

  set productTemplates(productTemplatesOriginal: ProductTemplate[]) {
    let productTemplates: any[] = productTemplatesOriginal;

    productTemplates = productTemplates.map((product) => {
      product.processTemplateIds = [];

      product.processTemplates.forEach((process) => {
        product.processTemplateIds.push(process.id);
      });
      return product;
    });

    sessionStorage.setItem('productTemplates', JSON.stringify(productTemplates));
  }

  create(productTemplateDraft: ProductTemplate): ProductTemplate {
    const id = uuidv4();
    this.productTemplates = [ ...this.productTemplates, { id, companyId: 'c0', ...productTemplateDraft } ];
    return this.getById(id);
  }

  getAll(): ProductTemplate[] {
    return this.productTemplates;
  }

  getById(id: string) {
    return this.productTemplates.find((template) => template.id === id);
  }
}
