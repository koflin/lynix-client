import { CompanyBase } from './companyBase';
import { ProductTemplate } from './productTemplate';


export interface Order extends CompanyBase {
  id: string;

  status: OrderStatus;
  name: string;
  description: string;
  deliveryDate: Date;

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
}

export type OrderStatus = 'in_preparation' | 'released' | 'in_progress' | 'completed';
