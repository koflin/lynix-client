import { RolesService } from 'src/app/core/roles/roles.service';
import { User } from 'src/app/models/user';
import { OrdersService } from './../orders/orders.service';
import { Step } from './../../models/step';
import { Order } from 'src/app/models/order';
import { ProcessTemplatesService } from './../processTemplates/process-templates.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Process } from 'src/app/models/process';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

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
    private processTemplatesService: ProcessTemplatesService,
    private rolesService: RolesService
    ) {
    if (!this.processes) {
      sessionStorage.setItem('processes', JSON.stringify([]));
    }
  }

  getAll() {
    return this.processes;
  }

  getAssigned(assigneId: string): Process[] {
    return this.processes.filter(process => process.assignedUserId === assigneId);
  }

  getById(id: string) {
    return this.processes.find(process => process.id === id);
  }

  getByOrderId(orderId: string) {
    return this.processes.filter((process) => process.orderId === orderId);
  }

  getForUser(user: User): Observable<Process[]> {
    let role = this.rolesService.getById(user.roleId);

    if (role.premissions.includes('view')) {
      return of(this.getAll());
    } else if (role.premissions.includes('execute')) {
      return of(this.getAssigned(user.id));
    }

    return of([]);
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

  assign(processId: string, assigneeId: string) {
    const index = this.processes.findIndex(process => process.id === processId);

    const updatedProcesses = this.processes;
    updatedProcesses[index].assignedUserId = assigneeId;

    this.processes = updatedProcesses;
  }

  finish(id: string) {
    const index = this.processes.findIndex(process => process.id === id);

    const updatedProcesses = this.processes;
    updatedProcesses[index].status = 'completed';

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

          estimatedTime: processT.stepTemplates.reduce((total, step) => total + step.estimatedTime, 0),
          mainTasks: processT.mainTasks,
          name: processT.name,
          previousComments: processT.previousComments,
          steps: processT.stepTemplates.map((stepT): Step => {
            return {
              ...stepT,
              timeTaken: 0,
              estimatedTime: 0
            };
          }),
          timeTaken: 0,
          currentStepIndex: 0,
          assignedUserId: null,
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
