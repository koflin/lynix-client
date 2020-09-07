import { Step } from './step';

export interface Process {
  name: string;
  mainTasks: string[];
  previousComments?: string;
  estimatedTime: number;

  timeTaken?: number;
  quantityDone: number;
  quantityTotal: number;
  currentStep: number;

  steps: Step[];
}
