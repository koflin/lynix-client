import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Process } from 'src/app/models/process';
import { Step } from 'src/app/models/step';
import { User } from 'src/app/models/user';
import { ProcessTemplatesService } from '../processTemplates/process-templates.service';
import { RolesService } from '../roles/roles.service';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash'
import { Order } from 'src/app/models/order';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  private processChange: BehaviorSubject<string>;
  public onProcessChange: Observable<string>;

  constructor(
    private api: ApiService,
  ) {
    this.processChange = new BehaviorSubject(null);
    this.onProcessChange = this.processChange.asObservable();
  }

  getAll() {
    return this.api.get<Process[]>('process');
  }

  getAssigned(assigneeId: string) {
    return this.api.get<Process[]>('process', { assignedUserId: assigneeId } );
  }

  getById(id: string) {
    return this.api.get<Process>('process/' + id);
  }

  getByOrderId(orderId: string) {
    return this.api.get<Process[]>('process', { orderId: orderId } );
  }

  // TODO Not implemented yet
  /*getForUser(user: User): Observable<Process[]> {
    let role = this.rolesService.getById(user.roleId);

    if (role.premissions.includes('view')) {
      return of(this.getAll());
    } else if (role.premissions.includes('execute')) {
      return of(this.getAssigned(user.id));
    }

    return of([]);
  }*/

  save(process: Process) {
    this.api.put<Process>('process/' + process.id, process).subscribe(process => this.processChange.next(process.id));
  }

  canWorkOn(processId: string, userId: string) {
    return this.getById(processId).pipe(map(process => process.assignedUserId === userId));
  }

  start(id: string, userId: string) {
    this.api.put('process/' + id + '/start', { userId }).subscribe(() => this.processChange.next(id));
  }

  stop(id: string) {
    this.api.put('process/' + id + '/stop').subscribe(() => this.processChange.next(id));
  }

  assign(processId: string, assigneeId: string) {
    this.api.put('process/' + processId + '/assign', { assigneeId }).subscribe(() => this.processChange.next(processId));
  }

  finish(id: string) {
    this.api.put('process/' + id + '/finish').subscribe(() => this.processChange.next(id));
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
            if (typeof stepT.keyMessage == 'string') {
              stepT.keyMessage = {ops:[]}
            }
            if (typeof stepT.tasks == 'string') {
              stepT.tasks = {ops:[]}
            }
            return {
              ...stepT,
              timeTaken: 0,
              estimatedTime: 0
            };
          }),
          timeTaken: 0,
          currentStepIndex: null,
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
