import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TimeService } from 'src/app/helpers/time/time.service';
import { ProcessTemplate } from 'src/app/models/processTemplate';
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
  name = new InputOutputValue("name", "Process name", false)
  taskToAdd: string;
  isFirstOpen:boolean=true

  estimatedTime;


  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.updateEstimatedTime();

  }
  calcEstimatedTime() {
    return this.processTemplate.stepTemplates.reduce((total, step) => total + step.estimatedTime, 0);
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
  addStep(index:number=this.processTemplate.stepTemplates.length-1) {
    this.processTemplate.stepTemplates.splice(index+1, 0, {
      title: 'Unnamed Step ' + (index+1),
      keyMessage: null,
      tasks: null,
      materials: [],
      toolIds: [],
      pictureUris: [],
      videoUris: [],
      estimatedTime: 0,
    })
    
  }
  removeStep(index: number) {
    this.processTemplate.stepTemplates.splice(index, 1);
  }


}