import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Quill from 'quill';

import { InputOutputValue } from '../../models/InputOutputValue';


@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  value
  @Input() result: any
  @Output() resultChange= new EventEmitter<any>()
  @Input() fieldInformation: InputOutputValue = new InputOutputValue()
  @Output() fieldInformationChange= new EventEmitter<InputOutputValue>()
  @Input() inputCheckForError: boolean = false
  @Input() inputPlaceholder:string="";
  @Input() inputRequired:boolean=false;
  @Input() errorMessage:string=""
  @Input() disabled:boolean=false
  requiredError:boolean = false
  error: boolean = false
  userHasTyped:boolean = false
  @ViewChild("textArea") textArea: ElementRef ;

  elementTextArea


  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    let toolbarValue = [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code', 'image'],
      [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }]
    ]
    if (this.disabled) {
      toolbarValue = []
    }
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.elementTextArea = new Quill( this.textArea.nativeElement,{
			modules: {
				toolbar: toolbarValue
			},
      //placeholder: 'Quill WYSIWYG',
      readOnly: this.disabled,
			theme: 'snow'
    });

    this.setValue()

    this.textChange()
    this.validation_save(false);
    this.cdref.detectChanges();


    //this.elementTextArea.enable(false);
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.setValue()
    this.validation_save(false);
  }
  setValue(){
    if (this.elementTextArea != undefined && this.value != this.result) {
      this.value = this.result
      this.elementTextArea.deleteText(0, this.elementTextArea.getLength())
      this.elementTextArea.updateContents(this.value)
    }
  }
  textChange(){
    this.elementTextArea.on('text-change', (delta, oldDelta, source) => {
      this.value = this.elementTextArea.getContents()
      this.result = this.value
      this.validation_save(source == 'user')


    });


  }
  validation_save(userHasTyped:boolean){
    let requiredError=false
    this.requiredError=false;
    this.error=false;

    if (!this.userHasTyped) {
      this.userHasTyped = userHasTyped
    }
    if(this.inputRequired){
      if(this.elementTextArea != undefined){
        if (this.elementTextArea.getLength()<=1) {
          requiredError = true
        }
      }else{
        requiredError=true
      }
      if(this.inputCheckForError || userHasTyped){
        this.requiredError=requiredError;
      }
      this.error = this.requiredError
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
