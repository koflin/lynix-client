import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProductTemplate } from 'src/app/models/productTemplate';
import { InputOutputValue, SingleMultiChoiceItem } from '../models/InputOutputValue';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productTemplate:ProductTemplate
  @Output() productTemplateChange = new EventEmitter<ProductTemplate>();
  @Input() checkForError
  @Output() selectTab = new EventEmitter<number>()
  processOptions:SingleMultiChoiceItem[]
  ignoreOptions:SingleMultiChoiceItem[]
  name = new InputOutputValue("name", "Product name", false)
  constructor(private processTemplatesService: ProcessTemplatesService ) { }

  ngOnInit(): void {
    this.setProcessOptions()
    this.setIgnoreProcessesOptions()
    
  }
  
  productSelector($e, index) {
    if ($e) {
      if ($e.hasOwnProperty('value')) {
        let set = false
        if (this.productTemplate.processes[index].template) {
          if (this.productTemplate.processes[index].template.id != $e.value) {
            set = true
          }         
        }else{
          set = true
        }
        if(set && $e){
          this.productTemplate.processes[index].template = this.processTemplatesService.getById($e.value)
          this.setIgnoreProcessesOptions()
          this.productTemplateChange.emit(this.productTemplate)
        }
      }else{
        if ($e.label) {
          this.productTemplate.processes[index].template= this.processTemplatesService.create({
              companyId: null,
              id: null,
              name: $e.label,
              mainTasks: [],
              stepTemplates: [],
              previousComments: null,
            }),

          this.productTemplateChange.emit(this.productTemplate)
        }
      }
    }
  }
  removeProcess(index: number) {
    this.productTemplate.processes.splice(index, 1);
  }
  addProcess() {
    this.productTemplate.processes.push({
      quantity: 1,
      template: null,
    });
  }
  setProcessOptions(){
    let temp = this.processTemplatesService.getAll()
    this.processOptions = temp.map((t)=> {
      return {value: t.id, label:t.name}
    })
  }
  setIgnoreProcessesOptions(){
    this.ignoreOptions = this.processTemplatesService.getAll().filter((product) => {
      return this.productTemplate.processes.findIndex(processUsed => processUsed.template && processUsed.template.id === product.id) !== -1;
    }).map((t)=> {
      return {value: t.id, label:t.name}
    })

  }

  
  

}
