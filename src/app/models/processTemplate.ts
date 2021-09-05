import { v4 as uuidv4 } from 'uuid';

import { CompanyBase } from './base/companyBase';
import { MetadataEntity } from './base/metadata';
import { StepTemplate } from './stepTemplate';

export interface ProcessTemplate extends CompanyBase, MetadataEntity {
  id?: string;

  name: string;
  mainTasks: string[];
  previousComments?: string[];

  steps: StepTemplate[];
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
