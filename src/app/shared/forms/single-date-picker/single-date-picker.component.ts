import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

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
  @Input() result:  any
  @Output() resultChange= new EventEmitter<any>()
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.validation_save(false);
  }
  validation_save(userHasTyped:boolean){
    this.requiredError = false
    this.formatError = false
    this.error = false
    if (this.userHasTyped) {
      this.resultChange.emit(this.result)
    } else {
      this.userHasTyped = userHasTyped
    }

    if (this.result!=='' && this.result!=undefined) {
      if (this.result == 'Invalid Date') {
        this.formatError = true
        this.error = true
        this.result=""
      }

    }else if (this.inputRequired) {
        if(this.inputCheckForError || userHasTyped){
          this.requiredError=true;
        }
        this.error=true;
    }
    this.fieldInformation.error = this.error

    if (this.errorMessage) {
      this.fieldInformation.error = true
    }
    this.fieldInformationChange.emit(this.fieldInformation)

  }


}
