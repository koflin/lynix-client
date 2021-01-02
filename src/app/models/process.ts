import { ProcessTemplate } from './processTemplate';
import { CompanyBase } from './companyBase';
import { Step } from './step';

export interface Process extends CompanyBase {
  id: string;
  orderId: string;
  template: ProcessTemplate;

  name: string;
  mainTasks: string[];
  previousComments?: string[];

  estimatedTime: number | undefined;

  timeTaken: number;
  currentStepIndex: number;
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed' | 'assistance_required';
  isOccupied: boolean;
  isRunning: boolean;

  assignedUserId: string;

  steps: Step[];
}
