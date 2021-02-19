import { AuthService } from 'src/app/auth/auth.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ProcessTemplatesService } from './../../../core/processTemplates/process-templates.service';
import { OrdersService } from './../../../core/orders/orders.service';
import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessNode } from './../../../models/ui/processNode';
import { Injectable, OnInit } from '@angular/core';
import { ProcessGroupNode } from 'src/app/models/ui/processGroupNode';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Process } from 'src/app/models/process';
import { UserRowNode } from 'src/app/models/ui/userRowNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  private processNodeChange: BehaviorSubject<ProcessNode[]>;
  public onProcessNodeChange: Observable<ProcessNode[]>;

  constructor(private processesService: ProcessesService,
              private usersService: UsersService,
              private rolesService: RolesService,
              private ordersService: OrdersService,
              private processTemplatesService: ProcessTemplatesService,
              private authService: AuthService) {
  }

  getAll() {
    return this.processesService.getAll().pipe(mergeMap(processes =>
      Promise.all(processes.map(async (process) => {
        return {
          id: process.id,
          name: process.name,
          status: process.status,
          timeTaken: process.timeTaken,
          isOccupied: process.isOccupied,
          canExecute: process.assignedUserId === this.authService.getLocalUser().id,
          assignedUser: process.assignedUserId ? await this.usersService.getById(process.assignedUserId).toPromise() : null,
          selected: false,
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
          role: this.rolesService.getById(user.roleId),
        };
      });
    }));
  }


}
