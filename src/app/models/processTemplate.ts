import { CompanyBase } from './companyBase';
import { StepTemplate } from './stepTemplate';
import { v4 as uuidv4 } from 'uuid';

export interface ProcessTemplate extends CompanyBase {
  id?: string;

  name: string;
  mainTasks: string[];
  previousComments?: string[];

  stepTemplates: StepTemplate[];
}

export class ProcessTemplateclass {
  id?: string;

  name: string;
  mainTasks: string[];
  previousComments?: string[];

  stepTemplates: StepTemplate[];
  constructor(value?){
    //Object.assign(this, value)
    this.id = (value) ? value.id : uuidv4()
    this.name = (value) ? value.name : "unnamed"
    this.mainTasks = (value) ? value.mainTasks : []
    this.previousComments = (value) ? value.previousComments : []
    this.stepTemplates = (value) ? value.stepTemplates : []
  }
}
