import { CompanyBase } from './companyBase';
import { User } from './user';

export interface Activation extends CompanyBase {
  id: string;
  userId: string;
  code: string;
  type: ActivationType;
  user: User;
}

export type ActivationType = 'activation' | 'reset';
