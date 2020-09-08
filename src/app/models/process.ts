import { Step } from './step';

export interface Process {
  id: string;
  name: string;
  mainTasks: string[];
  previousComments?: string;
  estimatedTime: number;

  timeTaken?: number;
  quantityDone: number;
  quantityTotal: number;
  currentStep: number;
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed' | 'assistance_required';

  steps: Step[];
}
