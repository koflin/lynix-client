import { Order } from 'src/app/models/order';

import { CompanyBase } from './companyBase';
import { Step } from './step';

export interface Process extends CompanyBase {
  id: string;
  order: Order;
  templateId: string;
  //template: ProcessTemplate;

  name: string;
  mainTasks: string[];
  previousComments?: string[];

  estimatedTime: number | undefined;

  timeTaken: number;
  currentStepIndex: number;
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed' | 'assistance_required';
  occupiedBy: string;
  isRunning: boolean;

  assignedUserId: string;

  steps: Step[];
}
