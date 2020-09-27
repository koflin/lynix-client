export interface ProductTemplateNode {
  id: string;
  name: string;

  processes: {
    id: string;
    name: string;
  }[];

  selected: boolean;
}
