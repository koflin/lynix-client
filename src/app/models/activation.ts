import { CompanyBase } from './companyBase';

export interface Activation extends CompanyBase {
  id: string;
  userId: string;
  code: string;
  type: ActivationType;
}

export type ActivationType = 'activation' | 'reset';
