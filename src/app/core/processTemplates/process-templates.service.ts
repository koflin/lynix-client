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
      sessionStorage.setItem('processTemplates', JSON.stringify(this._processTemplates));
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

  create(processTemplateDraft: ProcessTemplate): ProcessTemplate {
    const id = uuidv4();
    this.processTemplates = [ ...this.processTemplates, { id, companyId: 'c0', ...processTemplateDraft }];

    return this.getById(id);
  }

  getAll(): ProcessTemplate[] {
    return this.processTemplates;
  }

  getById(id: string): ProcessTemplate {
    return this.processTemplates.find((template) => template.id === id);
  }
}
