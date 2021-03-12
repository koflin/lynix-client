import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ProcesssGuideTickEvent } from 'src/app/models/events/processGuideTick.event';
import { Process } from 'src/app/models/process';
import { Permission } from 'src/app/models/role';
import { UserRowNode } from 'src/app/models/ui/userRowNode';

import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessNode } from './../../../models/ui/processNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  public onProcessNodeChange: Observable<ProcessNode>;
  public onProcessNodeAdd: Observable<ProcessNode>;
  public onProcessNodeRemove: Observable<string>;

  public onProcessNodeTick: Observable<ProcesssGuideTickEvent>;

  constructor(private processesService: ProcessesService,
              private usersService: UsersService,
              private rolesService: RolesService,
              private authService: AuthService) {

    this.onProcessNodeChange = processesService.onProcessChange.pipe(
      switchMap(node => this.compose(node))
    )

    this.onProcessNodeAdd = processesService.onProcessCreate.pipe(
      switchMap(node => this.compose(node))
    )

    this.onProcessNodeRemove = processesService.onProcessDelete;
    this.onProcessNodeTick = processesService.onProcessGuideTick;
  }

  async compose(process: Process) {
    const { id, name, status, timeTaken, occupiedBy, assignedUserId, order } = process;

    return {
      id,
      name,
      status,
      timeTaken,
      occupiedBy,
      canExecute: assignedUserId === this.authService.getLocalUser().id,
      assignedUser: assignedUserId ? await this.usersService.getById(assignedUserId).toPromise() : null,
      selected: false,
      deliveryDate: order.deliveryDate,
    };
  }

  getAll() {
    return this.processesService.getAll().pipe(mergeMap(processes =>
      Promise.all(processes.map(async (process) => {
        return {
          id: process.id,
          name: process.name,
          status: process.status,
          timeTaken: process.timeTaken,
          occupiedBy: process.occupiedBy,
          canExecute: process.assignedUserId === this.authService.getLocalUser().id,
          assignedUser: process.assignedUserId ? await this.usersService.getById(process.assignedUserId).toPromise() : null,
          selected: false,
          deliveryDate: process.order.deliveryDate,
        } as ProcessNode;
      }))
    ));
  }

  getPotentialAssignees() {
    return this.usersService.getWithPermissions(Permission.EXECUTE).pipe<UserRowNode[]>(map(users => {
      return users.map(user => {
        const { id, username, firstName, lastName, role } = user;
        return {
          id,
          username,
          firstName,
          lastName,
          role,
        };
      });
    }));
  }


}
