import { Step } from './../../models/step';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-step-guide-tab',
  templateUrl: './step-guide-tab.component.html',
  styleUrls: ['./step-guide-tab.component.scss']
})
export class StepGuideTabComponent implements OnInit {

  @Input() step: Step;
  @Output() stepChange = new EventEmitter<Step>();

  currentImageIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeImageIndex(index: number) {
    this.currentImageIndex = index;
  }

  getFullTime(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  }
}
