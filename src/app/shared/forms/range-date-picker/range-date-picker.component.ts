import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputOutputValue } from '../../models/InputOutputValue';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent implements OnInit {

  //basic information
  @Input() fieldInformation: InputOutputValue = new InputOutputValue()
  @Output() fieldInformationChange= new EventEmitter<InputOutputValue>()
  //result
  @Input() startDate:  Date
  @Output() startDateChange= new EventEmitter<Date>()
  @Input() endDate:  Date
  @Output() endDateChange= new EventEmitter<Date>()
  @Output() dateChange = new EventEmitter();

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

  private seperator = ' - ';

  constructor() {
  }

  ngOnInit(): void {
  }

  validation_save(value: Date[], userHasTyped:boolean){
    this.requiredError = false
    this.formatError = false
    this.error = false

    if (!this.userHasTyped) {
      this.userHasTyped = userHasTyped
    }

    if (value!=undefined && value.length == 2) {
      this.startDate = value[0];
      this.endDate = value[1];

    }else if (this.inputRequired) {
        if(this.inputCheckForError || userHasTyped){
          this.requiredError=true;
        }
        this.error=true;
        this.startDate = undefined;
        this.endDate = undefined;
    }
    this.fieldInformation.error = this.error

    if (this.errorMessage) {
      this.fieldInformation.error = true
    }
    this.fieldInformationChange.emit(this.fieldInformation)

    if (userHasTyped) {
      this.startDateChange.emit(this.startDate);// emit result
      this.endDateChange.emit(this.endDate);// emit result
      this.dateChange.emit();
    }
  }
}
