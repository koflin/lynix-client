import { group } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from 'src/app/core/events/events.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Event } from 'src/app/models/event';
import { LocalUser } from 'src/app/models/localUser';
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
  permissionView = Permission.VIEW;

  breadCrumbs: BreadCrumbInfo[]=[{name:"Process Overview", url: this.router.url },];
  nodesAreEmpty:boolean = undefined;
  windowWidth:number
  processNodeGroups: ProcessGroupNode [] = [
    {
      title: 'Assistance Required',
      status: 'assistance_required',
      nodes: []
    },
    {
      title: 'In Preparation',
      status: 'in_preparation',
      nodes: []
    },
    {
      title: 'Released',
      status: 'released',
      nodes: []
    },
    {
      title: 'Work in progress',
      status: 'in_progress',
      nodes: []
    },
    {
      title: 'Completed',
      status: 'completed',
      nodes: []
    }
  ];
  temp: ProcessNode[];
  currentUser:LocalUser
  potentialAssignees:SingleMultiChoiceItem[]
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }
  constructor(
    private router: Router,
    private processesOverviewService: ProcessesOverviewService ,
    private processesService: ProcessesService ,
    private usersService: UsersService,
    private authService: AuthService,
    private rolesService: RolesService,
    private event: EventsService
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLocalUser();

    this.fetch();

    // Change
    this.processesOverviewService.onProcessNodeChange.subscribe((changedNode) => {
      for (let group of this.processNodeGroups) {
        const node = group.nodes.find(candidate => candidate.id === changedNode.id);

        if (node.status != changedNode.status) {
          this.removeNode(node.id);
          this.addNode(changedNode);
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
        return {'value': d.id, 'label':d.username}
      })
    });
    this.windowWidth = window.innerWidth

  }

  addNode(node: ProcessNode) {
    for (let group of this.processNodeGroups) {
      if (group.status === node.status) {
        group.nodes.push(node);
        break;
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
    let assignedUser
    if (process.assignedUser) {
      assignedUser = process.assignedUser.id
    }
    if (assignedUser != userId) {
      this.processesService.assign(process.id, userId);
    }
    //console.log(process, userId)
  }
  toggleExpandRow(table, row) {
    table.rowDetail.toggleExpandRow(row);
  }

  fetch() {
    this.processesOverviewService.getAll().subscribe((processNodes) => {
      this.nodesAreEmpty = processNodes.length < 1 ? true : false;
      this.processNodeGroups.forEach((group) => {
        group.nodes = [];
        group.nodes.push(...processNodes.filter((node) => node.status === group.status));
      });
    });

  }

  getFullTime(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ';
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
    if (rowA.assiginedUser.username.toLowerCase() < rowB.assiginedUser.username.toLowerCase()) {
      return b;
    }
    if (rowA.assiginedUser.username.toLowerCase() > rowB.assiginedUser.username.toLowerCase()) {
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
