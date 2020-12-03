import { ApiService } from './../api/api.service';
import { ProcessTemplateDraft } from './../../models/ui/orderDraft';
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

  constructor(
    private api: ApiService,
    private processTemplatesService: ProcessTemplatesService
    ) {
    if (!this.productTemplates) {
      sessionStorage.setItem('productTemplates', JSON.stringify([]));
    }
  }

  get productTemplates(): ProductTemplate[] {
    const storage = sessionStorage.getItem('productTemplates');
    if (!storage) {
      return null;
    }

    const products = JSON.parse(storage);

    return products.map((product) => {
      product.processes.map((process) => {
        if (process.templateId) {
          process.template = this.processTemplatesService.getById(process.templateId)
        }
        return process;
      });
      return product;
    });
  }

  set productTemplates(productTemplatesOriginal: ProductTemplate[]) {
    let productTemplates: any[] = productTemplatesOriginal;

    productTemplates = productTemplates.map((product) => {
      product.processes.map((process) => {
        if (process.template) {
          process.templateId = process.template.id;
        }
        return process;
      });
      return product;
    });

    sessionStorage.setItem('productTemplates', JSON.stringify(productTemplates));
  }

  save(productTemplateDraft: ProductTemplate): ProductTemplate {
    const index = this.productTemplates.findIndex(product => product.id === productTemplateDraft.id);
    const updatedProducts = JSON.parse(JSON.stringify(this.productTemplates));

    updatedProducts[index] = productTemplateDraft;
    this.productTemplates = updatedProducts;

    //return this.getById(productTemplateDraft.id);
    return null;
  }

  create(productTemplateDraft: ProductTemplate): ProductTemplate {
    productTemplateDraft.id = uuidv4();
    productTemplateDraft.companyId = 'c0';

    this.productTemplates = [ ...this.productTemplates, { ...productTemplateDraft } ];

    //return this.getById(productTemplateDraft.id);
    return null;
  }

  delete(id: string) {
    const index = this.productTemplates.findIndex(product => product.id === id);
    this.productTemplates.splice(index, 1);
  }

  getAll(): ProductTemplate[] {
    return this.productTemplates;
  }

  getById(id: string) {
    //return this.api.get('templates/products')
    return null;
  }
}
