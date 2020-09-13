import { CompanyBase } from './companyBase';
import { ProductTemplate } from './productTemplate';
import { Process } from './process';


export interface Order extends CompanyBase {
  id: string;

  status: string;
  name: string;
  description: string;

  products: {
    templateId: string;
    quantity: number;
  }[];
}
