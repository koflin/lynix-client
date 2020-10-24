import { OrdersService } from './../orders/orders.service';
import { Step } from './../../models/step';
import { Order } from 'src/app/models/order';
import { ProcessTemplatesService } from './../processTemplates/process-templates.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Process } from 'src/app/models/process';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(
    private processTemplatesService: ProcessTemplatesService
    ) {
    if (!this.processes) {
      sessionStorage.setItem('processes', JSON.stringify([]));
    }
  }

  getAll() {
    return this.processes;
  }

  getById(id: string) {
    return this.processes.find(process => process.id === id);
  }

  getByOrderId(orderId: string) {
    return this.processes.filter((process) => process.orderId === orderId);
  }

  save(process: Process) {
    const index = this.processes.findIndex(proc => proc.id === process.id);
    const updatedProcess = this.processes;

    updatedProcess[index] = process;
    this.processes = updatedProcess;

    return this.getById(process.id);
  }

  canWorkOn(processId: string, userId: string) {
    return this.processes.find(process => process.id = processId).assignedUserId === userId;
  }

  start(id: string) {
    const index = this.processes.findIndex(process => process.id === id);

    const updatedProcesses = this.processes;
    updatedProcesses[index].status = 'in_progress';
    updatedProcesses[index].isOccupied = true;

    this.processes = updatedProcesses;
  }

  stop(id: string) {
    const index = this.processes.findIndex(process => process.id === id);

    const updatedProcesses = this.processes;
    updatedProcesses[index].isOccupied = false;

    this.processes = updatedProcesses;
  }

  createForOrder(order: Order) {
    order.products.forEach((product) => {
      product.template.processes.forEach((process) => {
        const processT = process.template;

        const processInstance: Process = {
          companyId: 'c0',
          id: null,
          orderId: order.id,
          status: 'released',

          template: processT,
          estimatedTime: processT.estimatedTime,
          mainTasks: processT.mainTasks,
          name: processT.name,
          previousComments: processT.previousComments,
          steps: processT.stepTemplates.map((stepT): Step => {
            return {
              ...stepT,
              timeTaken: 0
            };
          }),

          timeTaken: 0,
          currentStepIndex: null,
          assignedUserId: '5f4411a4e9dc5b57b4a9782b',
          isOccupied: false,
          isRunning: false,
        };

        for (let i = 0; i < product.quantity; i++) {
          for (let j = 0; j < process.quantity; j++) {
            this.processes = [...this.processes, {...processInstance, id: uuidv4() }];
          }
        }
      });
    });
  }
}
