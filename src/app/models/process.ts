import { Order } from 'src/app/models/order';
import { ProcessTemplate } from 'src/app/models/processTemplate';

import { MetadataEntity } from './base/metadata';
import { Step } from './step';

export interface Process extends ProcessTemplate, MetadataEntity {
  id: string;
  order: Order;
  templateId: string;
  //template: ProcessTemplate;

  /*name: string;
  mainTasks: string[];
  previousComments?: string[];*/

  estimatedTime: number | undefined;
  deliveryDate: Date;

  timeTaken: number;
  currentStepIndex: number;
  status: ProcessStatus;
  occupiedBy: string;
  isRunning: boolean;

  assignedUserId: string;

  steps: Step[];
}

export enum ProcessStatus {
  IN_PREPARATION = 'in_preparation',
  RELEASED = 'released',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ASSISTANCE_REQUIRED = 'assistance_required'
};
