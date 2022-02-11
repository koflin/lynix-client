import { ProcessStatus } from '../process';
import { ProcessNode } from './processNode';

export interface ProcessGroupNode {
  title: string;
  status: ProcessStatus;
  nodes: ProcessNode[];
  loaded: boolean;
}
