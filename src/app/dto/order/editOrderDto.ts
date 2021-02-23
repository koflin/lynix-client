
import moment from 'moment';
import { Order } from './../../models/order';

export class EditOrderDto {
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed';
  name: string;
  description: object;
  deliveryDate: Date;

  products: {
    templateId: string;
    quantity: number;
  }[];

  constructor(order: Order) {
    Object.assign(this, order);

    this.deliveryDate = order.deliveryDate;

    this.products = order.products.map(prod => {
      return {
        templateId: prod.template.id,
        quantity: prod.quantity
      }
    });
  }
}
