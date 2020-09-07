import { ProductTemplate } from './productTemplate';
import { Process } from './process';


export interface Order {
  id: string;
  companyId: string;
  status: string;
  name: string;
  description: string;
  productTemplates?: ProductTemplate[];
  processes: Process[];
}
