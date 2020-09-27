import { CompanyBase } from './companyBase';
import { StepTemplate } from './stepTemplate';

export interface ProcessTemplate extends CompanyBase {
  id?: string;

  name: string;
  mainTasks: string[];
  previousComments?: string[];
  estimatedTime: number | undefined;

  stepTemplates: StepTemplate[];
}
