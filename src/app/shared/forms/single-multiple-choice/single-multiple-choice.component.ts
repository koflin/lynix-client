import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { InputOutputValue, SingleMultiChoiceItem } from '../../models/InputOutputValue';

@Component({
  selector: 'app-single-multiple-choice',
  templateUrl: './single-multiple-choice.component.html',
  styleUrls: ['./single-multiple-choice.component.scss']
})
export class SingleMultipleChoiceComponent implements OnInit {
  @Input() fieldInformation: InputOutputValue = new InputOutputValue()
  @Output() fieldInformationChange= new EventEmitter<InputOutputValue>()
  @Input() result:  any = null
  @Output() resultChange= new EventEmitter<any>()
  @Input() resultShouldBeOnlyValue: boolean = false
  @Input() inputCheckForError: boolean = false
  userHasTyped:boolean = false
  @Input() inputRequired:boolean=false;
  @Input() isMultipleChoice:boolean=false
  @Input() isSearchable:boolean = false
  @Input() allowUserCreateOption:boolean =false
  @Input() placeholder:string = $localize `selecting a option...`
  @Input() ignoreOptions: any[]
  _data: SingleMultiChoiceItem[] = []
  @Input() data:SingleMultiChoiceItem[] = [];

  tempData: SingleMultiChoiceItem[]
  @Input() addTagText:string= $localize `press enter to create a new option`

  requiredError:boolean = false
  error:boolean = false
  @Input() errorMessage:string=""

  @Input() readonly: boolean = false;

  @ViewChild("selectr") selectr: ElementRef ;


  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (this.data) {
      this.tempData = this.data.map((d) => {
        return {...d}
      })

      if (this.ignoreOptions) {

        this.tempData = this.tempData.filter((df) =>{
          return this.ignoreOptions.findIndex(ignoreOption => ignoreOption.value == df.value ) === -1
        })
      }

      if (this.allowUserCreateOption) {
        this.tempData.unshift({'label':this.placeholder, value: undefined, disabled:true})
      }
      this.validation_save(false);
    }
  }

  validation_save(userHasTyped:boolean, option?){
    this.error= false
    this.requiredError = false
    let requiredError = false
    if (!this.userHasTyped) {
      this.userHasTyped = userHasTyped
    }

    let testValue=[]
    if( ! (this.result instanceof Array) ){
      testValue = [this.result]
    }else{
      testValue = this.result
    }
    if (this.inputRequired) {
      if (testValue.length > 0) {
        for (let index = 0; index < testValue.length; index++) {
          let element = testValue[index];
          if (element instanceof Object) {
            if (element.label.length == 0) {
              requiredError = true
              break;
            }
          }else{
            if (element != undefined) {
              if (element.length==0){
                requiredError = true
                break;
              }
            }else{
              requiredError = true
              break;
            }
          }
        }
      }else{
        requiredError = true
      }

      if (requiredError) {
        if((this.inputCheckForError || userHasTyped)){
          this.requiredError=true;
        }
        this.error=true;

      }

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
