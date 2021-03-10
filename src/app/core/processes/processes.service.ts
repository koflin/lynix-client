import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProcessDto } from 'src/app/dto/process/createProcessDto';
import { EditProcessDto } from 'src/app/dto/process/editProcessDto';
import { Event } from 'src/app/models/event';
import { ProcesssGuideTickEvent } from 'src/app/models/events/processGuideTick.event';
import { Order } from 'src/app/models/order';
import { Process } from 'src/app/models/process';

import { ApiService } from '../api/api.service';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  private processChange: BehaviorSubject<string>;
  public onProcessChange: Observable<string>;

  public onProcessGuideTick: Observable<ProcesssGuideTickEvent>;

  constructor(
    private api: ApiService,
    private events: EventsService
  ) {
    this.processChange = new BehaviorSubject(null);
    this.onProcessChange = merge(
      this.events.onEvents<Process>(Event.PROCESS_CREATE, Event.PROCESS_UPDATE).pipe(map(process => process.id)),
      this.events.onEvent<string>(Event.PROCESS_DELETE),
      this.processChange.asObservable()
    );

    this.onProcessGuideTick = this.events.onEvent(Event.PROCESS_GUIDE_TICK);
  }

  getAll() {
    return this.api.get<Process[]>('processes');
  }

  getAssigned(assigneeId: string) {
    return this.api.get<Process[]>('processes', { assignedUserId: assigneeId } );
  }

  getById(id: string) {
    return this.api.get<Process>('processes/' + id);
  }

  getByOrderId(orderId: string) {
    return this.api.get<Process[]>('processes', { orderId: orderId } );
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
    this.api.put<Process>('processes/' + process.id, new EditProcessDto(process)).subscribe(process => this.processChange.next(process.id));
  }

  canWorkOn(processId: string, userId: string) {
    return this.getById(processId).pipe(map(process => process.assignedUserId === userId));
  }

  enter(id: string) {
    return this.api.patch('processes/' + id + '/enter');
  }

  exit(id: string) {
    return this.api.patch<void>('processes/' + id + '/exit');
  }

  start(id: string, userId: string) {
    return this.api.patch('processes/' + id + '/start', { userId });
  }

  stop(id: string) {
    return this.api.patch('processes/' + id + '/stop');
  }

  assign(processId: string, assigneeId: string) {
    this.api.patch('processes/' + processId + '/assign', { assigneeId }).subscribe(() => this.processChange.next(processId));
  }

  finish(id: string) {
    this.api.patch('processes/' + id + '/finish').subscribe(() => this.processChange.next(id));
  }

  switch(id: string, stepIndex: number) {
    this.api.patch('processes/' + id + '/switch', { stepIndex }).subscribe();
  }

  createForOrder(order: Order) {
    order.products.forEach((product) => {
      product.template.processes.forEach((process) => {
        const templateId = process.template.id;

        /* CAST QUERY FOR MESSAGE FIELDS
        if (typeof stepT.keyMessage == 'string') {
              stepT.keyMessage = {ops:[]}
            }
            if (typeof stepT.tasks == 'string') {
              stepT.tasks = {ops:[]}
            }
        */

        for (let i = 0; i < product.quantity; i++) {
          for (let j = 0; j < process.quantity; j++) {
            this.api.post<Process>('processes', new CreateProcessDto(order.id, templateId )).subscribe((process) => this.processChange.next(process.id));
          }
        }
      });
    });
  }
}
