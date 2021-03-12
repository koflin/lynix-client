import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
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

  private processChange: Subject<Process>;
  public onProcessChange: Observable<Process>;
  public onProcessCreate: Observable<Process>;
  public onProcessDelete: Observable<string>;

  public onProcessGuideTick: Observable<ProcesssGuideTickEvent>;

  constructor(
    private api: ApiService,
    private events: EventsService
  ) {

    this.processChange = new Subject();

    this.onProcessChange = merge(
      this.events.onEvent<Process>(Event.PROCESS_UPDATE),
      this.processChange.asObservable()
    );

    this.onProcessCreate = this.events.onEvent<Process>(Event.PROCESS_CREATE);
    this.onProcessDelete = this.events.onEvent<string>(Event.PROCESS_DELETE);

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

  save(process: Process) {
    return this.api.put<Process>('processes/' + process.id, new EditProcessDto(process));
  }

  canWorkOn(processId: string, userId: string) {
    return this.getById(processId).pipe(map(process => process.assignedUserId === userId));
  }

  enter(id: string) {
    return this.api.patch<Process>('processes/' + id + '/enter');
  }

  exit(id: string) {
    return this.api.patch<Process>('processes/' + id + '/exit');
  }

  start(id: string, userId: string) {
    return this.api.patch<Process>('processes/' + id + '/start', { userId });
  }

  stop(id: string) {
    return this.api.patch<Process>('processes/' + id + '/stop');
  }

  assign(processId: string, assigneeId: string) {
    return this.api.patch<Process>('processes/' + processId + '/assign', { assigneeId }).subscribe(process => this.processChange.next(process));
  }

  finish(id: string) {
    return this.api.patch<Process>('processes/' + id + '/finish');
  }

  switch(id: string, stepIndex: number) {
    return this.api.patch<Process>('processes/' + id + '/switch', { stepIndex });
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
            this.api.post<Process>('processes', new CreateProcessDto(order.id, templateId )).subscribe(process => this.processChange.next(process));
          }
        }
      });
    });
  }
}

