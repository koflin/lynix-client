import { StepTemplate } from './stepTemplate';

export interface ProcessTemplate {
  name: string;
  mainTasks: string[];
  previousComments?: string;
  estimatedTime: number;
  steps: StepTemplate[];
}
