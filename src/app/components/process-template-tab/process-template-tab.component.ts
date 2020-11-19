import { TimeService } from './../../helpers/time/time.service';
import { ProcessTemplate } from './../../models/processTemplate';
import { Component, Input, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-process-template-tab',
  templateUrl: './process-template-tab.component.html',
  styleUrls: ['./process-template-tab.component.scss']
})
export class ProcessTemplateTabComponent implements OnInit, DoCheck {

  @Input() selectedTab: number;
  @Input() processTemplate: ProcessTemplate;
  @Output() processTemplateChange = new EventEmitter<ProcessTemplate>();

  //estimatedTime: { hours: number, minutes: number };
  estimatedTime;

  taskToAdd: string;

  constructor(private timeService: TimeService) { }

  ngDoCheck(): void {
    //this.processTemplateChange.emit(this.processTemplate);
  }

  ngOnInit(): void {
    /*this.estimatedTime = {
      hours: this.getEstimatedHours(this.processTemplate.estimatedTime),
      minutes: this.getEstimatedMinutes(this.processTemplate.estimatedTime)
    };*/
    this.updateEstimatedTime();
  }

  stepTemplateChange() {
    this.processTemplateChange.emit(this.processTemplate);
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  addStep() {
    const size = this.processTemplate.stepTemplates.push({
      title: 'Unnamed Step' + this.processTemplate.stepTemplates.length,
      keyMessage: null,
      tasks: null,
      materials: [],
      toolIds: [],
      pictureUris: [],
      videoUris: [],
      estimatedTime: 0,
    });

    this.selectTab(this.processTemplate.stepTemplates.length);

    this.editStep(size - 1);
  }

  editStep(index: number) {
    this.selectTab(index + 1);
  }

  removeStep(index: number) {
    this.processTemplate.stepTemplates.splice(index, 1);
  }

  addTask() {
    this.processTemplate.mainTasks.push(this.taskToAdd);
    this.taskToAdd = undefined;
  }

  removeTask(index: number) {
    this.processTemplate.mainTasks.splice(index, 1);
  }

  /*changeEstimatedHours(hours: number) {
    hours = hours ? hours : 0;

    this.estimatedTime.hours = hours;
    this.changeEstimatedTime();
  }

  changeEstimatedMinutes(minutes: number) {
    minutes = minutes ? minutes : 0;

    this.estimatedTime.minutes = minutes;
    this.changeEstimatedTime();
  }*/

  calcEstimatedTime() {
    return this.processTemplate.stepTemplates.reduce((total, step) => total + step.estimatedTime, 0);
  }

  updateEstimatedTime() {
    this.estimatedTime = this.timeService.getDurationHmString(this.calcEstimatedTime());
  }

  /*getHours(seconds: number) {
    return Math.floor(seconds / 3600);
  }

  getMinutes(seconds: number) {
    return Math.ceil((seconds - this.getHours(seconds) * 3600) / 60);
  }*/

  /*private changeEstimatedTime() {
    this.processTemplate.estimatedTime = this.estimatedTime.hours * 3600 + this.estimatedTime.minutes * 60;
  }*/
}
