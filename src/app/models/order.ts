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

export type OrderStatus = 'in_preparation' | 'released' | 'in_progress' | 'completed';
