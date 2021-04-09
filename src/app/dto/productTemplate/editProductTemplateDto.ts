import { ProductTemplate } from 'src/app/models/productTemplate';

export class EditProductTemplateDto {
  name: string;
  description: string;
  processes: {
      templateId: string;
      quantity: number;
  }[];

  constructor(product: ProductTemplate) {
    Object.assign(this, product);

    this.processes = product.processes.map(proc => {
      return {
        templateId: proc.template.id,
        quantity: proc.quantity
      }
    });
  }
}
