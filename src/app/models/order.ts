import { CompanyBase } from './base/companyBase';
import { MetadataEntity } from './base/metadata';
import { ProductTemplate } from './productTemplate';


export interface Order extends CompanyBase, MetadataEntity {
  id: string;

  status: OrderStatus;
  name: string;
  description: string;
  deliveryDate: Date;

  products: {
    template: ProductTemplate;
    quantity: number;
  }[];
}

export enum OrderStatus {
  IN_PREPARATION = 'in_preparation',
  RELEASED = 'released',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
