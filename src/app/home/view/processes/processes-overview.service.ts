import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
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
  }

  async compose(process: Process) {
    const { id, name, status, timeTaken, occupiedBy, assignedUserId, order, estimatedTime, deliveryDate } = process;

    return {
      id,
      name,
      status,
      timeTaken,
      estimatedTime,
      occupiedBy,
      canExecute: assignedUserId === this.authService.getLocalUser().id,
      assignedUser: assignedUserId ? await this.usersService.getById(assignedUserId).toPromise() : null,
      selected: false,
      orderDeliveryDate: order.deliveryDate,
      processDeliveryDate: deliveryDate,
    } as ProcessNode;
  }

  getAll() {
    return this.processesService.getAll().pipe(mergeMap(processes =>
      Promise.all(processes.map(async (process) => {
        return {
          id: process.id,
          name: process.name,
          status: process.status,
          timeTaken: process.timeTaken,
          estimatedTime: process.estimatedTime,
          occupiedBy: process.occupiedBy,
          canExecute: process.assignedUserId === this.authService.getLocalUser().id,
          assignedUser: process.assignedUserId ? await this.usersService.getById(process.assignedUserId).toPromise() : null,
          selected: false,
          orderDeliveryDate: process.order.deliveryDate,
          processDeliveryDate: process.deliveryDate
        } as ProcessNode;
      }))
    ));
  }

  getPotentialAssignees() {
    return this.usersService.getWithPermissions(Permission.EXECUTE).pipe<UserRowNode[]>(map(users => {
      return users.map(user => {
        const { id, email, displayName, firstName, lastName, role } = user;
        return {
          id,
          email,
          displayName,
          firstName,
          lastName,
          role,
        };
      });
    }));
  }


}
