import { ProcessTemplateDraft } from './../../models/ui/orderDraft';
import { ProcessTemplate } from './../../models/processTemplate';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProcessTemplatesService {

  private _processTemplates: ProcessTemplate[] = [
    {
      companyId: 'c0',
      id: 'pt0',

      name: 'Hull',
      mainTasks: ['Task1', 'Task2'],
      previousComments: ['Test Comment'],
      estimatedTime: 3600,

      stepTemplates: [
        {
          title: 'Inner Hull',
          materials: ['Wood'],
          toolIds: ['t0'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
        },
        {
          title: 'Outer Hull',
          materials: ['Metal'],
          toolIds: ['t1'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
        }
      ]
    }
  ];

  constructor() {
    if (!this.processTemplates) {
      sessionStorage.setItem('processTemplates', JSON.stringify([]));
    }
  }

  get processTemplates(): ProcessTemplate[] {
    const storage = sessionStorage.getItem('processTemplates');
    if (!storage) {
      return null;
    }

    const templates = JSON.parse(storage);
    return templates;
  }

  set processTemplates(processTemplates: ProcessTemplate[]) {
    sessionStorage.setItem('processTemplates', JSON.stringify(processTemplates));
  }

  save(processTemplateDraft: ProcessTemplate): ProcessTemplate {
    const index = this.processTemplates.findIndex(process => process.id === processTemplateDraft.id);
    const updatedProcess = this.processTemplates;

    updatedProcess[index] = processTemplateDraft;
    this.processTemplates = updatedProcess;

    return this.getById(processTemplateDraft.id);
  }

  create(processTemplateDraft: ProcessTemplate): ProcessTemplate {
    processTemplateDraft.id = uuidv4();
    processTemplateDraft.companyId = 'c0';

    this.processTemplates = [ ...this.processTemplates, { ...processTemplateDraft } ];
    return this.getById(processTemplateDraft.id);
  }

  delete(id: string) {
    const index = this.processTemplates.findIndex(process => process.id === id);
    this.processTemplates.splice(index, 1);
  }

  getAll(): ProcessTemplate[] {
    return this.processTemplates;
  }

  getById(id: string): ProcessTemplate {
    return this.processTemplates.find((template) => template.id === id);
  }
}
