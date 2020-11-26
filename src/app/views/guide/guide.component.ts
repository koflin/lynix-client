import { MatTableDataSource } from '@angular/material/table';
import { TimeService } from './../../helpers/time/time.service';
import { Process } from 'src/app/models/process';
import { ProcessesService } from './../../core/processes/processes.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit, OnDestroy, OnChanges {

  currentTabIndex = 0;
  updater: NodeJS.Timeout;
  lastSaved = 0;

  process: Process;

  dataSource: MatTableDataSource<{
    index: number,
    step: Step,
  }>;
  displayedColumns = ['stepNo', 'title', 'timeTaken'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processesService: ProcessesService
    ) {
    }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.exit();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.process = this.processesService.getById(id);

      this.dataSource = new MatTableDataSource(this.process.steps.map((step, index) => {
        return {
          step,
          index: index + 1
        };
      }));

      if (this.process.currentStepIndex) {
        this.currentTabIndex = this.process.currentStepIndex + 1;
      }

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
    if (this.currentTabIndex > 0) {
      this.currentTabIndex -= 1;
    }
  }

  onResume() {
    this.process.isRunning = true;
  }

  onStop() {
    this.process.isRunning = false;
  }

  onNext() {
    if (this.currentTabIndex < this.process.steps.length + 1) {
      this.currentTabIndex += 1;
    }
  }

  onJump() {
    this.currentTabIndex = this.process.currentStepIndex + 1;
  }

  onSwitch() {
    if (this.currentTabIndex !== 0) {
      this.process.currentStepIndex = this.currentTabIndex - 1;
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
