import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { InputOutputValue } from '../../models/InputOutputValue';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  @Input() fieldInformation: InputOutputValue = new InputOutputValue()
  @Output() fieldInformationChange= new EventEmitter<InputOutputValue>()
  @Input() inputCheckForError: boolean = false
  @Input() inputValidation:string="string";
  @Input() inputType:string="text";
  @Input() result: any
  @Output() resultChange= new EventEmitter<any>()


  @Input() inputPlaceholder:string="";
  @Input() inputRequired:boolean=false;
  @Input() errorMessage:string=""

  requiredError:boolean = false
  error: boolean = false
  formatError:boolean = false
  userHasTyped:boolean = false

  validationText:string = "string";
  validationUrl:string = "url";
  validationNumber:string = "int";
  validationDecimal: string = "float";
  validationMail:string='mail';
  validationPhone:string='phone';
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validation_save(false);
  }

  validation_save(userHasTyped:boolean, $e?){
    this.requiredError=false;
    this.error=false;
    this.formatError=false;

    if (userHasTyped) {
      this.resultChange.emit(this.result);
    }

    if (!this.userHasTyped) {
      this.userHasTyped = userHasTyped
    }
    if ($e!=undefined) {
      this.result = $e
      if (this.inputType == 'number' || [this.validationNumber, this.validationDecimal].includes(this.inputValidation)) {
        this.result = + this.result
      }
    }

    if (this.result!=='' && this.result!=undefined) {
      let regexp
      switch (this.inputValidation) {
        case this.validationUrl:
            regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
          if (!regexp.test(this.result))
          {
            this.formatError= true;
          }else{
            this.formatError = false;
          }
          break;
        case this.validationNumber:
          regexp= /^[0-9]*$/
          if (!regexp.test(this.result)){
            this.formatError= true;
          }else{
              this.formatError=false;
          }
          break;
        case this.validationDecimal:
          this.result.replace(',','.');
          if(isNaN(this.result)){
            this.formatError=true;
          }else{
            this.formatError=false;
          }
          break;

        case this.validationMail:
          regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (!regexp.test(this.result)){
            this.formatError= true;
          }else{
            this.formatError = false;
          }
          break;

        case this.validationPhone:
          regexp = /^([\+][0-9]{1,3}([ \.\-])?)?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$/;
          if (!regexp.test(this.result)){
                this.formatError= true;
          }else{
                this.formatError = false;
          }
          break;
      }

      if (this.formatError==true) {
        this.error=true;
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
