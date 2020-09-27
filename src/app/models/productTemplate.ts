import { CompanyBase } from './companyBase';
import { ProcessTemplate } from './processTemplate';

export interface ProductTemplate extends CompanyBase {
  id: string;

  name: string;
  processTemplates: ProcessTemplate[];
}
