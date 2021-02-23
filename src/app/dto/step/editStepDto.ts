import { Step } from "src/app/models/step";

export class EditStepDto {
  timeTaken: number;

  constructor(step: Step) {
    Object.assign(this, step);
  }
}
