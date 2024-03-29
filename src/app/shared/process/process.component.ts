import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeService } from 'src/app/helpers/time/time.service';
import { ProcessTemplate } from 'src/app/models/processTemplate';

import { TextFieldComponent } from '../forms/text-field/text-field.component';
import { InputOutputValue, SingleMultiChoiceItem } from '../models/InputOutputValue';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  @Input() processTemplate:ProcessTemplate
  @Output() processTemplateChange = new EventEmitter<ProcessTemplate>();
  @Output() selectTab = new EventEmitter<number>()
  @Input() checkForError
  processOptions:SingleMultiChoiceItem[]
  ignoreOptions:SingleMultiChoiceItem[]
  name = new InputOutputValue("name", $localize `Process name`, false)
  taskToAdd: string;
  isFirstOpen:boolean=true

  estimatedTime;

  @Input() navFragment: string;


  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.updateEstimatedTime();

  }
  calcEstimatedTime() {
    return this.processTemplate.steps.reduce((total, step) => total + step.estimatedTime, 0);
  }

  updateEstimatedTime() {
    this.estimatedTime = this.timeService.getDurationHmString(this.calcEstimatedTime());
  }
  addTask() {
    this.processTemplate.mainTasks.push(this.taskToAdd);
    this.taskToAdd = undefined;
  }

  removeTask(index: number) {
    this.processTemplate.mainTasks.splice(index, 1);
  }
  addStep(index:number=this.processTemplate.steps.length-1) {
    this.processTemplate.steps.splice(index+1, 0, {
      title: $localize `Unnamed Step` + ' ' + (this.processTemplate.steps.length+1),
      keyMessage: null,
      tasks: null,
      materials: [],
      toolIds: [],
      pictureUris: [],
      videoUris: [],
      estimatedTime: 0,
    });
  }
  removeStep(index: number) {
    this.processTemplate.steps.splice(index, 1);
  }

  moveUp(i: number) {
    if (i > 0) {
      const top = this.processTemplate.steps[i - 1];
      this.processTemplate.steps[i - 1] = this.processTemplate.steps[i];
      this.processTemplate.steps[i] = top;

      this.processTemplateChange.emit(this.processTemplate);
    }
  }

  moveDown(i: number) {
    if (i < this.processTemplate.steps.length - 1) {
      const bottom = this.processTemplate.steps[i + 1];
      this.processTemplate.steps[i + 1] = this.processTemplate.steps[i];
      this.processTemplate.steps[i] = bottom;

      this.processTemplateChange.emit(this.processTemplate);
    }
  }

  onConfirmStep(index: number, target: TextFieldComponent) {
    this.addStep(index);
  }
}
