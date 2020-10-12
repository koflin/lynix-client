import { ProcessNode } from './../../models/ui/processNode';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-process-node',
  templateUrl: './process-node.component.html',
  styleUrls: ['./process-node.component.scss']
})
export class ProcessNodeComponent implements OnInit {

  @Input() processNode: ProcessNode;
  @Output() selectChange = new EventEmitter<boolean>();
  @Output() startWorking = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  select() {
    this.selectChange.emit(!this.processNode.selected);
  }

  start() {
    this.startWorking.emit();
  }

  getHours(seconds: number) {
    return Math.round(seconds / 360) / 10;
  }

  getFullTime(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  }
}
