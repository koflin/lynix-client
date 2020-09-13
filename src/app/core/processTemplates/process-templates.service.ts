import { ProcessTemplate } from './../../models/processTemplate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessTemplatesService {

  private processTemplates: ProcessTemplate[] = [
    {
      companyId: 'c0',
      id: 'pt0',

      name: 'Hull',
      mainTasks: ['Task1', 'Task2'],
      previousComments: 'Test Comment',
      estimatedTime: 3600,

      stepTemplates: [
        {
          title: 'Inner Hull',
          materials: ['Wood'],
          tools: ['Saw'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
        },
        {
          title: 'Outer Hull',
          materials: ['Metal'],
          tools: ['Welder'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
        }
      ]
    }
  ];

  constructor() { }

  getAll(): ProcessTemplate[] {
    return this.processTemplates;
  }
}
