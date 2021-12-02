import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProcessTemplatePreview } from 'src/app/models/previews/processTemplate-preview';
import { ProcessTemplate } from 'src/app/models/processTemplate';

import { ApiService } from '../api/api.service';
import { EditProcessTemplateDto } from './../../dto/processTemplate/editProcessTemplateDto';

@Injectable({
  providedIn: 'root'
})
export class ProcessTemplatesService {

  private processTemplatesChange: BehaviorSubject<string>;
  public onProcessTemplatesChange: Observable<string>;

  constructor(
    private api: ApiService,
  ) {
    this.processTemplatesChange = new BehaviorSubject(null);
    this.onProcessTemplatesChange = this.processTemplatesChange.asObservable();
  }

  save(templateDraft: ProcessTemplate){
    this.api.put<ProcessTemplate>('templates/process/' + templateDraft.id, new EditProcessTemplateDto(templateDraft)).subscribe(/*template => this.processTemplatesChange.next(template.id)*/);
  }

  create(templateDraft: ProcessTemplate) {
    return this.api.post<ProcessTemplate>('templates/process', templateDraft);
  }

  delete(id: string) {
    return this.api.delete('templates/process/' + id);
  }

  getAll() {
    return this.api.get<ProcessTemplate[]>('templates/process');
  }

  getById(id: string) {
    return this.api.get<ProcessTemplate>('templates/process/' + id);
  }

  search(name: string, limit?: number) {
    return this.api.get<ProcessTemplatePreview[]>('templates/process/search', { name, limit });
  }
}
