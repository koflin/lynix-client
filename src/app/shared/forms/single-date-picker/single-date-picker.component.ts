import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';

import { InputOutputValue } from '../../models/InputOutputValue';

@Component({
  selector: 'app-single-date-picker',
  templateUrl: './single-date-picker.component.html',
  styleUrls: ['./single-date-picker.component.scss']
})
export class SingleDatePickerComponent implements OnInit {
  //basic information
  @Input() fieldInformation: InputOutputValue = new InputOutputValue()
  @Output() fieldInformationChange= new EventEmitter<InputOutputValue>()
  //result
  @Input() result:  Date
  @Output() resultChange= new EventEmitter<Date>()

  @Input() format: string;

  // parentComponent want to check if there is an error or parentComponent has calculated there is an error
  @Input() inputCheckForError: boolean = false
  userHasTyped:boolean = false
  @Input() inputRequired:boolean=false;
  @Input() errorMessage:string=""
  @Input() placeholder:string=""
  requiredError:boolean = false
  formatError:boolean = false
  error:boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  validation_save(value: string, userHasTyped:boolean){
    this.requiredError = false
    this.formatError = false
    this.error = false

    if (!this.userHasTyped) {
      this.userHasTyped = userHasTyped
    }

    if (value!=='' && value!=undefined) {
      if (value == 'Invalid Date') {
        this.formatError = true
        this.error = true
        this.result= undefined;
      } else {
        this.result = moment(value).toDate();
      }

    }else if (this.inputRequired) {
        if(this.inputCheckForError || userHasTyped){
          this.requiredError=true;
        }
        this.error=true;
        this.result = undefined;
    }
    this.fieldInformation.error = this.error

    if (this.errorMessage) {
      this.fieldInformation.error = true
    }
    this.fieldInformationChange.emit(this.fieldInformation)

    if (userHasTyped) {
      this.resultChange.emit(this.result);
    }
  }


}
