import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Process } from 'src/app/models/process';

import { TextArea } from '../models/InputOutputValue';

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

  isManual: boolean;

  constructor(
    @Optional() @Attribute('isManual') isManual: any,
  ) {
    this.isManual = isManual != undefined;
  }

  ngOnInit(): void {
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
