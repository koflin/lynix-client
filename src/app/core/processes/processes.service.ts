import { ProcessTemplatesService } from './../processTemplates/process-templates.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Process } from 'src/app/models/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  private _processes: any[] = [
    {
      companyId: 'c0',
      id: 'p0',
      orderId: 'o0',
      templateId: 'pt0',

      name: 'Hull',
      mainTasks: ['Task1', 'Task2'],
      previousComments: 'Test Comment',
      estimatedTime: 3600,

      timeTaken: 3000,
      currentStepIndex: 1,
      status: 'completed',

      assignedUserId: '5f4411a4e9dc5b57b4a9782b',

      steps: [
        {
          title: 'Inner Hull',
          materials: ['Wood'],
          toolIds: ['t0'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',

          timeTaken: 2000,
        },
        {
          title: 'Outer Hull',
          materials: ['Metal'],
          toolIds: ['t1'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',

          timeTaken: 1000,
        }
      ]
    },
    {
      companyId: 'c0',
      id: 'p1',
      orderId: 'o1',
      templateId: 'pt0',

      name: 'Hull',
      mainTasks: ['Task1', 'Task2'],
      previousComments: 'Test Comment',
      estimatedTime: 3600,

      timeTaken: 3500,
      currentStepIndex: 1,
      status: 'completed',

      assignedUserId: '5f4411a4e9dc5b57b4a9782b',

      steps: [
        {
          title: 'Inner Hull',
          materials: ['Wood'],
          toolIds: ['t0'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
          timeTaken: 2300,
        },
        {
          title: 'Outer Hull',
          materials: ['Metal'],
          toolIds: ['t1'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
          timeTaken: 1200,
        }
      ]
    },
    {
      companyId: 'c0',
      id: 'p2',
      orderId: 'o1',
      templateId: 'pt0',

      name: 'Hull',
      mainTasks: ['Task1', 'Task2'],
      previousComments: 'Test Comment',
      estimatedTime: 3600,

      timeTaken: 800,
      currentStepIndex: 0,
      status: 'in_progress',

      assignedUserId: '5f4411a4e9dc5b57b4a9782b',

      steps: [
        {
          title: 'Inner Hull',
          materials: ['Wood'],
          toolIds: ['t0'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
          timeTaken: 800,
        },
        {
          title: 'Outer Hull',
          materials: ['Metal'],
          toolIds: ['t1'],
          keyMessage: 'KeyMessage1\n KeyMessage2\n',
          tasks: 'Task1\nTask2\n',
          timeTaken: 0,
        }
      ]
    },
  ];

  get processes(): Process[] {
    const storage = sessionStorage.getItem('processes');
    if (!storage) {
      return null;
    }

    const processes = JSON.parse(storage);

    return processes.map((process) => {
      process.template = this.processTemplatesService.getById(process.templateId);

      return process;
    });
  }

  set processes(processesOriginal: Process[]) {
    let processes: any[] = processesOriginal;

    processes = processes.map((process) => {
      process.templateId = process.template.id;
      return process;
    });

    sessionStorage.setItem('processes', JSON.stringify(processes));
  }

  constructor(private processTemplatesService: ProcessTemplatesService) {
    if (!this.processes) {
      sessionStorage.setItem('processes', JSON.stringify(this._processes));
    }
  }

  getAll() {
    return this.processes;
  }

  getByOrderId(orderId: string) {
    return this.processes.filter((process) => process.orderId === orderId);
  }
}
