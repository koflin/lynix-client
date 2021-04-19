import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  name = new InputOutputValue("name", $localize `Product name`, false)
  description = new InputOutputValue("description", $localize `Description`, false)

  @Input() navFragment: string;

  constructor(private processTemplatesService: ProcessTemplatesService ) { }

  ngOnInit(): void {
    this.setProcessOptions()
    this.setIgnoreProcessesOptions()

  }

  processSelector($e, index) {
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
          this.processTemplatesService.getById($e.value).subscribe((template) => {
            this.productTemplate.processes[index].template = template;
            this.setIgnoreProcessesOptions();
            this.productTemplateChange.emit(this.productTemplate);
          });
        }
      }else{
        if ($e.label) {
          this.productTemplate.processes[index].template.name = $e.label;

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
      template: {
        companyId: undefined,
        id: undefined,
        name: '',
        mainTasks: [],
        stepTemplates: [],
        previousComments: [],
      },
    });
  }
  setProcessOptions(){
    this.processTemplatesService.getAll().subscribe((temp) => {
      this.processOptions = temp.map((t)=> {
        return {value: t.id, label:t.name}
      });
    });
  }

  setIgnoreProcessesOptions(){
    this.processTemplatesService.getAll().subscribe((templates) => {
      this.ignoreOptions = templates.filter((product) => {
        return this.productTemplate.processes.findIndex(processUsed => processUsed.template && processUsed.template.id === product.id) !== -1;
      }).map((t)=> {
        return {value: t.id, label:t.name}
      });
    });
  }




}
