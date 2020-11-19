import { Process } from 'src/app/models/process';
import { Order } from 'src/app/models/order';
export interface OrderNode {
  workOderId: string;
  name: string;

  status: string;

  products: {
    name: string;
    quantity: number;
  }[];

  processGroups: {
    id: string;
    quantityDone: number;
    quantityTotal: number;
    name: string;
  }[];
}
