import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { Process } from 'src/app/models/process';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { trigger, transition, query, style, animate, group } from '@angular/animations';

import * as moment from 'moment';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/core/users/users.service';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class GuideComponent implements OnInit {
  breadCrumbs: BreadCrumbInfo[]=[]
  currentTabIndex = 0;
  updater: NodeJS.Timeout;
  lastSaved = 0;
  stepToggleId:number=0
  process: Process;
  stepNames:string[]=[]
  order:Order
  assignee: User
  displayedColumns = ['stepNo', 'title', 'timeTaken'];

  constructor(private router: Router ,
    private route: ActivatedRoute,
    private processesService: ProcessesService,
    private ordersService: OrdersService,
    private usersService: UsersService ) { }


  ngOnDestroy(): void {
    this.exit();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.process = this.processesService.getById(id);
      this.breadCrumbs=[{name:"Process Overview", url: "/processes/overview" }, {name:'Process: ' + this.process.name , url: this.router.url},];
      this.stepNames = this.process.steps.map((s)=>{
        return s.title
      })
      this.stepNames.unshift("Overview")
      this.stepNames.push("Finish")
      this.order = this.ordersService.getById(this.process.orderId)
      this.assignee= this.usersService.getById(this.process.assignedUserId)
      console.log(this.order, this.process)
      /* this.dataSource = new MatTableDataSource(this.process.steps.map((step, index) => {
        return {
          step,
          index: index + 1
        };
      })); */

      this.updater = setInterval(this.onUpdate.bind(this), 1000);
    });
  }


  onUpdate() {
    if (this.process.isRunning) {
      this.process.steps[this.process.currentStepIndex].timeTaken += 1;
      this.process.timeTaken += 1;
    }

    // Update process every 10 th second
    if (this.lastSaved >= 10) {
      this.processesService.save(this.process);
      this.lastSaved = 0;
    }

    this.lastSaved++;
  }

  onExit() {
    this.exit();
    this.router.navigate(['processes/overview']);
  }
  onPrevious() {
    if (this.stepToggleId > 0) {
      this.stepToggleId -= 1;
    }
  }

  onResume() {
    this.process.isRunning = true;
  }

  onStop() {
    this.process.isRunning = false;
  }

  onNext() {
    if (this.stepToggleId < this.process.steps.length + 1) {
      this.stepToggleId += 1;
    }
  }

  onJump() {
    this.stepToggleId = this.process.currentStepIndex + 1;
  }

  onStart() {
    this.process.currentStepIndex = 0;
    this.onJump();
  }

  onSwitch() {
    if (this.stepToggleId !== 0) {
      this.process.currentStepIndex = this.stepToggleId - 1;
    }
  }

  onFinish() {
    this.process.status = 'completed';
    this.exit();
    this.router.navigate(['processes/overview']);
  }

  exit() {
    clearInterval(this.updater);
    this.process.isRunning = false;
    this.processesService.save(this.process);
    this.processesService.stop(this.process.id);
  }

  getEstimatedHours(seconds: number) {
    return Math.floor(seconds / 3600);
  }

  getEstimatedMinutes(seconds: number) {
    return Math.floor((seconds - this.getEstimatedHours(seconds) * 3600) / 60);
  }

  getFullTime(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  }

}