import { Injectable } from '@angular/core';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

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
    this.api.put<ProcessTemplate>('templates/process/' + templateDraft.id, templateDraft).subscribe(template => this.processTemplatesChange.next(template.id));
  }

  create(templateDraft: ProcessTemplate) {
    this.api.post<ProcessTemplate>('templates/process', templateDraft).subscribe(template => this.processTemplatesChange.next(template.id));
  }

  delete(id: string) {
    this.api.delete('templates/process' + id).subscribe(() => this.processTemplatesChange.next(id));
  }

  getAll() {
    return this.api.get<ProcessTemplate[]>('templates/process');
  }

  getById(id: string) {
    return this.api.get<ProcessTemplate>('templates/process/' + id);
  }
}
