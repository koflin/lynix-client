import { Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { Router } from '@angular/router';
import { ProcessGroupNode, ProcessNode } from 'src/app/models/ui';
import { ProcessesOverviewService } from '../processes-overview.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/core/users/users.service';
import { User } from 'src/app/models/user';
import { RolesService } from 'src/app/core/roles/roles.service';
import { Role } from 'src/app/models/role';
import { SingleMultiChoiceItem } from 'src/app/shared/models/InputOutputValue';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-processes-overview',
  templateUrl: './processes-overview.component.html',
  styleUrls: ['./processes-overview.component.scss']
})
export class ProcessesOverviewComponent implements OnInit {
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
  temp: ProcessNode[]
  currentUser:User
  role:Role
  potentialAssignees:SingleMultiChoiceItem[]
  @ViewChild('myTable') table: any;
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
    private rolesService: RolesService
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLocalUser();
    this.role = this.rolesService.getById(this.currentUser.roleId);
    this.update();
    this.processesOverviewService.getPotentialAssignees().subscribe(candidates => {
      this.potentialAssignees = candidates.map((d)=>{
        return {'value': d.id, 'label':d.username}
      })
    });
    this.windowWidth = window.innerWidth

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

  onStart(id: string) {
    this.processesService.start(id, this.currentUser.id);
    this.update();
    this.router.navigate(['guide/' + id]);
  }

  onAssign(id: string) {
    /* let dialogRef = this.dialog.open(UserSelectionComponent, {
      width: '700px',
      data: {
        options: this.processesOverviewService.getPotentialAssignees()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.processesService.assign(id, result);
        this.update();
      }
    }); */
  }
  onActivate($event){
    if ($event.type=="click") {
      this.toggleExpandRow($event.row)
    }
  }
  assignUserToProcess(userId, process:ProcessNode){
    let assignedUser
    if (process.assignedUser) {
      assignedUser = process.assignedUser.id
    }
    if (assignedUser != userId) {
      this.processesService.assign(process.id, userId);
      this.update()
    }
    //console.log(process, userId)
  }
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  update() {

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
    this.processesService.start(processId, this.currentUser.id);
    this.update();
    this.router.navigate(['guide/' + processId]);
  }

}
