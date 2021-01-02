import { Injectable } from '@angular/core';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ProcessNode } from 'src/app/models/ui';
import { UserRowNode } from 'src/app/models/ui/userRowNode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  constructor(private processesService: ProcessesService ,
    private usersService: UsersService ,
    private rolesService: RolesService ,) { }

  getAll(): ProcessNode [] {
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
        deliveryDate: new Date(),
        selected: false,
      };
    });
  }

  getPotentialAssignees(): UserRowNode [] {
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
