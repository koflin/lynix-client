import { Component, OnInit, Input } from '@angular/core';
import { Step } from 'src/app/models/step';
import * as moment from 'moment';
import { Process } from 'src/app/models/process';
import { TextArea } from '../models/InputOutputValue';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MediaService } from 'src/app/helpers/media/media.service';

@Component({
  selector: 'app-step-guide-tab',
  templateUrl: './step-guide-tab.component.html',
  styleUrls: ['./step-guide-tab.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { noPause: false, showIndicators: true } }
  ]
})
export class StepGuideTabComponent implements OnInit {
  @Input() process: Process
  @Input() stepIndex: number
  showAlert:boolean=true;
  currentImageIndex: number;
  currentVideoIndex: number;
  constructor(private mediaService: MediaService) {
  }

  ngOnInit(): void {
  }
  getFullTime(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  }

  isString(val): boolean { return typeof val === 'string'}

  checkIfTextAreaIsEmpty(value:TextArea){
    if (value.ops) {
      for (let index = 0; index < value.ops.length; index++) {
        let element = value.ops[index];
        if (element.insert) {
          if (element.insert.length>1) {
            return false
            //break
          }
        }
      }
    }

    return true
  }

}
