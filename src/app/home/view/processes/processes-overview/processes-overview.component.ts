import { group } from '@angular/animations';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from 'src/app/core/events/events.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { Event } from 'src/app/models/event';
import { LocalUser } from 'src/app/models/localUser';
import { ProcessStatus } from 'src/app/models/process';
import { Permission } from 'src/app/models/role';
import { ProcessGroupNode, ProcessNode } from 'src/app/models/ui';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { UserActivity } from 'src/app/models/user';
import { SingleMultiChoiceItem } from 'src/app/shared/models/InputOutputValue';

import { ProcessesOverviewService } from '../processes-overview.service';

@Component({
  selector: 'app-processes-overview',
  templateUrl: './processes-overview.component.html',
  styleUrls: ['./processes-overview.component.scss']
})
export class ProcessesOverviewComponent implements OnInit {
  permissions = Permission;

  breadCrumbs: BreadCrumbInfo[]=[{name: $localize `Processes`, url: new RouteInfo(this.router.url) },];
  nodesAreEmpty:boolean = undefined;
  loaded = false;
  windowWidth:number
  processNodeGroups: ProcessGroupNode [] = [
    {
      title: $localize `All`,
      status: null,
      nodes: []
    },
    {
      title: $localize `In Preparation`,
      status: ProcessStatus.IN_PREPARATION,
      nodes: []
    },
    {
      title: $localize `Released`,
      status: ProcessStatus.RELEASED,
      nodes: []
    },
    {
      title: $localize `In progress`,
      status: ProcessStatus.IN_PROGRESS,
      nodes: []
    },
    {
      title: $localize `Completed`,
      status: ProcessStatus.COMPLETED,
      nodes: []
    }
  ];
  temp: ProcessNode[];
  currentUser:LocalUser
  potentialAssignees:SingleMultiChoiceItem[]

  tabIndex = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }

  get tabNames() {
    return this.processNodeGroups.map(process => process.title);
  }

  constructor(
    private router: Router,
    private processesOverviewService: ProcessesOverviewService ,
    private processesService: ProcessesService,
    private usersService: UsersService,
    private authService: AuthService,
    private rolesService: RolesService,
    private event: EventsService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLocalUser();

    this.fetch();

    // Change
    this.processesOverviewService.onProcessNodeChange.subscribe((changedNode) => {

      for (let i = 1; i < this.processNodeGroups.length; i++) {
        const group = this.processNodeGroups[i];
        const node = group.nodes.find(candidate => candidate.id === changedNode.id);

        if (node) {
          if (node.status != group.status) {
            this.removeNode(node.id);
            this.addNode(changedNode);
          } else {
            this.changeNode(changedNode);
          }
          this.processNodeGroups[i].nodes = [...group.nodes];
          break;
        }
      }
    });

    // Add
    this.processesOverviewService.onProcessNodeAdd.subscribe((newNode) => {
      this.addNode(newNode);
    });

    // Remove
    this.processesOverviewService.onProcessNodeRemove.subscribe((id) => {
      this.removeNode(id);
    });

    this.processesOverviewService.getPotentialAssignees().subscribe(candidates => {
      this.potentialAssignees = candidates.map((d)=>{
        return {'value': d.id, 'label':d.firstName + ' ' + d.lastName}
      })
    });
    this.windowWidth = window.innerWidth

  }

  addNode(node: ProcessNode) {
    for (let group of this.processNodeGroups) {
      if (group.status === node.status || group.status === null) {
        group.nodes.push(node);
        break;
      }
    }
  }

  changeNode(node: ProcessNode) {
    for (let group of this.processNodeGroups) {
      const index = group.nodes.findIndex(candidate => candidate.id === node.id);

      if (index != -1) {
        group.nodes[index] = node;
      }
    }
  }

  removeNode(id: string) {
    for (let group of this.processNodeGroups) {
      const index = group.nodes.findIndex(candidate => candidate.id === id);

      if (index != -1) {
        group.nodes.splice(index, 1);
      }
    }
  }

  onSelect(id: string) {
    this.processNodeGroups.forEach((group) => {
      group.nodes.forEach((node) => {
        if (node.id === id) {
          node.selected = !node.selected;
        }
      });
    });
  }

  onActivate(table, $event){
    if ($event.type=="click") {
      this.toggleExpandRow(table, $event.row)
    }
  }
  assignUserToProcess(userId, process:ProcessNode){
    /*if (process.assignedUser != userId) {
      this.processesService.assign(process.id, userId);
    }*/

    this.processesService.assign(process.id, userId);
  }
  toggleExpandRow(table, row) {
    table.rowDetail.toggleExpandRow(row);
  }

  fetch() {
    this.processesOverviewService.getAll().subscribe((processNodes) => {
      this.nodesAreEmpty = processNodes.length < 1 ? true : false;

      for (let group of this.processNodeGroups) {
        group.nodes = [];
        group.nodes.push(...processNodes.filter((node) => node.status === group.status || group.status === null));
      }

      this.loaded = true;
    });

  }

  userNameSort(valueA, valueB, rowA, rowB, sort){
    // Just a simple sort function comparisoins
    let a = 1
    let b = -1
    if(sort=="desc"){
      b = [a, a = b][0];
    }
    if (rowA.assigninedUser == undefined) {
      return b
    }else if(rowB.assigniedUser == undefined){
      return a
    }
    if (rowA.assiginedUser.displayName.toLowerCase() < rowB.assiginedUser.displayName.toLowerCase()) {
      return b;
    }
    if (rowA.assiginedUser.displayName.toLowerCase() > rowB.assiginedUser.displayName.toLowerCase()) {
      return a;
    }
  }
  getCellClass(): any {
    return {
      'overflow-visible' : true,
    };
  }
  paddingClass(){
    return{
      'pt-0': true
    }
  }
  paddingLeftNone(){
    return{
      'pl-0': true,
      }
  }
  start(processId){
    this.event.emit(Event.ACTIVITY_CHANGE, UserActivity.GUIDE);
    this.processesService.enter(processId).subscribe(() => this.router.navigate(['guide/' + processId]));
  }

}
