import { User } from 'src/app/models/user';

export interface ProcessNode {
  id: string;
  name: string;
  timeTaken: number;
  estimatedTime: number;
  status: string;
  occupiedBy: string;
  orderDeliveryDate: Date;
  processDeliveryDate: Date;
  canExecute: boolean;
  assignedUser: User;

  selected: boolean;
}
