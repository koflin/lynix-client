import { CompanyBase } from './companyBase';
import { ProductTemplate } from './productTemplate';
import { Process } from './process';


export interface Order extends CompanyBase {
  id: string;

  status: 'in_preparation' | 'released' | 'in_progress' | 'completed';
  name: string;
  description: string;

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
}
