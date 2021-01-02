import { ApiService } from './../api/api.service';
import { ProcessTemplateDraft } from './../../models/ui/orderDraft';
import { ProcessTemplatesService } from './../processTemplates/process-templates.service';
import { map } from 'rxjs/operators';
import { ProductTemplate } from './../../models/productTemplate';
import { Injectable } from '@angular/core';
import { ProductTemplate } from 'src/app/models/productTemplate';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplatesService {

  private productTemplatesChange: BehaviorSubject<string>;
  public onProductTemplatesChange: Observable<string>;

  constructor(
    private api: ApiService,
  ) {
    this.productTemplatesChange = new BehaviorSubject(null);
    this.onProductTemplatesChange = this.productTemplatesChange.asObservable();
  }

  save(templateDraft: ProductTemplate){
    this.api.put<ProductTemplate>('templates/product/' + templateDraft.id, templateDraft).subscribe(template => this.productTemplatesChange.next(template.id));
  }

  create(templateDraft: ProductTemplate) {
    this.api.post<ProductTemplate>('templates/product', templateDraft).subscribe(template => this.productTemplatesChange.next(template.id));
  }

  delete(id: string) {
    this.api.delete('templates/product' + id).subscribe(() => this.productTemplatesChange.next(id));
  }

  getAll() {
    return this.api.get<ProductTemplate[]>('templates/product');
  }

  getById(id: string) {
    return this.api.get<ProductTemplate>('templates/product/' + id);
  }
}
