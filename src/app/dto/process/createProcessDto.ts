
export class CreateProcessDto {
  orderId: string;
  templateId: string;

  constructor(orderId: string, templateId: string) {
    this.orderId = orderId;
    this.templateId = templateId;
  }
}
