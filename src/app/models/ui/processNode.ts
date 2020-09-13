import { Order } from 'src/app/models/order';
import { ProcessTemplate } from '../processTemplate';
import { Process } from 'src/app/models/process';

export interface ProcessNode {
  id: string;
  name: string;
  timeTaken: number;
  status: string;

  selected: boolean;
}
