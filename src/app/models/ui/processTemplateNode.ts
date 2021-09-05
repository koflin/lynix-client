export interface ProcessTemplateNode {
  id: string;
  name: string;
  quantity: number;
  description: string;
  stepNames: string[];

  createdAt: Date;
  createdBy: string;
  editedAt: Date;
  editedBy: string;

  selected: boolean;
}
