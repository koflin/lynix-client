import { v4 as uuidv4 } from 'uuid';

import { CompanyBase } from './companyBase';
import { ProcessTemplate } from './processTemplate';

export interface ProductTemplate extends CompanyBase {
  id: string;

  name: string;
  description: string;

  processes: {
    template: ProcessTemplate;
    quantity: number;
  }[];
}

export class ProductTemplateClass {
  id: string;

  name: string;

  processes: {
    template: ProcessTemplate;
    quantity: number;
  }[];
  constructor(value?: ProductTemplate ){
    this.id = (value) ? value.id : uuidv4()
    this.name = (value) ? value.name : 'unnamed'
    this.processes = []
  }
}
