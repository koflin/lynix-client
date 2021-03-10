import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ProcesssGuideTickEvent } from 'src/app/models/events/processGuideTick.event';
import { UserRowNode } from 'src/app/models/ui/userRowNode';

import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessNode } from './../../../models/ui/processNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  public onProcessNodeChange: Observable<ProcessNode[]>;
  public onProcessNodeTick: Observable<ProcesssGuideTickEvent>;

  constructor(private processesService: ProcessesService,
              private usersService: UsersService,
              private rolesService: RolesService,
              private authService: AuthService) {

    this.onProcessNodeChange = merge(
      processesService.onProcessChange,
      processesService.onProcessGuideTick.pipe(
        filter(data => data.timeTaken % 60 == 0)
      )
    ).pipe(
      switchMap(() => this.getAll())
    );

    this.onProcessNodeTick = processesService.onProcessGuideTick;
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
    /*return this.usersService.getWithPermissions('execute').map((user): UserRowNode => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: this.rolesService.getById(user.roleId),
      };
    });*/
    return this.usersService.getAll().pipe<UserRowNode[]>(map(users => {
      return users.map(user => {
        return {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      });
    }));
  }


}
