import { RolesService } from 'src/app/core/roles/roles.service';
import { UserRowNode } from './../../../models/ui/userRowNode';
import { UsersService } from 'src/app/core/users/users.service';
import { ProcessTemplatesService } from './../../../core/processTemplates/process-templates.service';
import { OrdersService } from './../../../core/orders/orders.service';
import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessNode } from './../../../models/ui/processNode';
import { Injectable, OnInit } from '@angular/core';
import { ProcessGroupNode } from 'src/app/models/ui/processGroupNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  constructor(private processesService: ProcessesService,
              private usersService: UsersService,
              private rolesService: RolesService,
              private ordersService: OrdersService,
              private processTemplatesService: ProcessTemplatesService) {
  }

  getAll(): ProcessNode[] {
    let currentUser = this.usersService.getCurrentUser();

    return this.processesService.getForUser(currentUser).map((process) => {
      return {
        id: process.id,
        name: process.name,
        status: process.status,
        timeTaken: process.timeTaken,
        isOccupied: process.isOccupied,
        canExecute: process.assignedUserId === currentUser.id,
        assignedUser: this.usersService.getById(process.assignedUserId),
        selected: false,
      };
    });
  }

  getPotentialAssignees(): UserRowNode[] {
    return this.usersService.getWithPermissions('execute').map((user): UserRowNode => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: this.rolesService.getById(user.roleId),
      };
    });
  }
}
