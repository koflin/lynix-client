import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { ProcessTemplate } from '../processTemplate';
import { Process } from 'src/app/models/process';

export interface ProcessNode {
  id: string;
  name: string;
  timeTaken: number;
  status: string;
  isOccupied: boolean;
  deliveryDate: Date;
  canExecute: boolean;
  assignedUser: User;

  selected: boolean;
}
