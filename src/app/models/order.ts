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

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
}
