import { CompanyBase } from './companyBase';
import { ProductTemplate } from './productTemplate';


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
