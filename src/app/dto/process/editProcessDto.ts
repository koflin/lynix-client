import { Process } from "src/app/models/process";

export class EditProcessDto {
  timeTaken: number;
  currentStepIndex: number;
  status: 'in_preparation' | 'released' | 'in_progress' | 'completed' | 'assistance_required';
  isOccupied: boolean;
  isRunning: boolean;

  assignedUserId: string;

  constructor(process: Process) {
    Object.assign(this, process);
  }
}
