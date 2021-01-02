import { CompanyBase } from './companyBase';
import { ProductTemplate } from './productTemplate';
import { Process } from './process';
import { ObjectUnsubscribedError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


export interface Order extends CompanyBase {
  id: string;

  status: 'in_preparation' | 'released' | 'in_progress' | 'completed';
  name: string;
  description: string;
  deliveryDate: Date;

  //dueBy: string;

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
}
export class OrderClass{
  id: string;

  status: 'in_preparation' | 'released' | 'in_progress' | 'completed';
  name: string;
  description: string;
  deliveryDate: Date;

  //dueBy: string;

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
  constructor(value?: Order ){
    this.id = (value) ? value.id : uuidv4()
    this.status =  (value) ? value.status :'in_preparation'
    this.name = (value) ? value.name :'unnamed'
    this.description = (value) ? value.description : ""
    this.deliveryDate = (value) ? value.deliveryDate : null
    this.products = []
  }
}
