export interface ProcessTemplateNode {
  id: string;
  name: string;
  quantity: number;
  description: string;
  stepNames: string[];

  selected: boolean;
}
