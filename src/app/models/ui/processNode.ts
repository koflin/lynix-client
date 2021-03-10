import { User } from 'src/app/models/user';

export interface ProcessNode {
  id: string;
  name: string;
  timeTaken: number;
  status: string;
  occupiedBy: string;
  deliveryDate: Date;
  canExecute: boolean;
  assignedUser: User;

  selected: boolean;
}
