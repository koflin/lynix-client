import { ProcessTemplate } from './processTemplate';
import { CompanyBase } from './companyBase';
import { Step } from './step';

export interface Process extends CompanyBase {
  id: string;
  orderId: string;
  templateId: string;

  name: string;
  mainTasks: string[];
  previousComments?: string;
  estimatedTime: number;

  timeTaken?: number;
  currentStepIndex: number;
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed' | 'assistance_required';

  assignedUserId: string;

  steps: Step[];
}
