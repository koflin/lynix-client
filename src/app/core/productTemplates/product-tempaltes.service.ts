import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditProductTemplateDto } from 'src/app/dto/productTemplate/editProductTemplateDto';
import { ProductTemplate } from 'src/app/models/productTemplate';

import { ApiService } from './../api/api.service';

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
    this.api.put<ProductTemplate>('templates/product/' + templateDraft.id, new EditProductTemplateDto(templateDraft)).subscribe(/*template => this.productTemplatesChange.next(template.id)*/);
  }

  create(templateDraft: ProductTemplate) {
    return this.api.post<ProductTemplate>('templates/product', new EditProductTemplateDto(templateDraft));
  }

  delete(id: string) {
    return this.api.delete('templates/product' + id);
  }

  getAll() {
    return this.api.get<ProductTemplate[]>('templates/product');
  }

  getById(id: string) {
    return this.api.get<ProductTemplate>('templates/product/' + id);
  }
}
