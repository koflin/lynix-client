import { ProcessNode } from './processNode';
export interface ProcessGroupNode {
  title: string;
  status: string;
  nodes: ProcessNode[];
}
