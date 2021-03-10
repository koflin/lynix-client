import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EventsService } from 'src/app/core/events/events.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProcessesService } from 'src/app/core/processes/processes.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Event } from 'src/app/models/event';
import { Order } from 'src/app/models/order';
import { Process } from 'src/app/models/process';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { User, UserActivity } from 'src/app/models/user';

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
export class GuideComponent implements OnInit, OnDestroy {
  breadCrumbs: BreadCrumbInfo[]=[]
  currentTabIndex = 0;
  lastSaved = 0;
  stepToggleId:number=0
  process: Process;
  stepNames:string[]=[]
  order:Order
  assignee: User
  displayedColumns = ['stepNo', 'title', 'timeTaken'];
  id: string;

  constructor(private router: Router ,
    private route: ActivatedRoute,
    private processesService: ProcessesService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private event: EventsService) { }


  ngOnDestroy(): void {
    this.exit();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.event.emit(Event.ACTIVITY_CHANGE, UserActivity.GUIDE);

        this.update();

        this.processesService.onProcessChange.subscribe((changedId) => {
          if (changedId && changedId === this.id) {
            this.update();
          }
        });

        this.processesService.onProcessGuideTick.subscribe((event) => {
          if (event.processId === this.id) {
            this.process.timeTaken = event.timeTaken;
            this.process.steps[event.stepIndex].timeTaken = event.stepTime;
          }
        });
      }
      /* this.dataSource = new MatTableDataSource(this.process.steps.map((step, index) => {
        return {
          step,
          index: index + 1
        };
      })); */
    });
  }

  update() {
    this.processesService.getById(this.id).subscribe(async (process) => {
      this.process = process;

      this.assignee = await this.usersService.getById(this.process.assignedUserId).toPromise();

      this.breadCrumbs=[{name:"Process Overview", url: "/processes/overview" }, {name:'Process: ' + this.process.name , url: this.router.url},];
      this.stepNames = this.process.steps.map((s)=>{
        return s.title
      })
      this.stepNames.unshift("Overview")
      this.stepNames.push("Finish")
    });
  }

  onExit() {
    this.exit().then(() => this.router.navigate(['processes/overview']));
  }
  onPrevious() {
    if (this.stepToggleId > 0) {
      this.stepToggleId -= 1;
    }
  }

  onResume() {
    this.processesService.start(this.process.id, this.assignee.id).subscribe(() => this.process.isRunning = true);
  }

  onStop() {
    this.processesService.stop(this.process.id).subscribe(() => this.process.isRunning = false);
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
      this.processesService.switch(this.process.id, this.process.currentStepIndex);
    }
  }

  onFinish() {
    this.processesService.finish(this.process.id);
    this.router.navigate(['home/processes/overview']);
  }

  async exit() {
    this.event.emit(Event.ACTIVITY_CHANGE, UserActivity.IDLE);

    await this.processesService.exit(this.process.id).toPromise();
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
