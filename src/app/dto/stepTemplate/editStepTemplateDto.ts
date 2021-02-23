import { StepTemplate } from "src/app/models/stepTemplate";

export class EditStepTemplateDto {
  title: string;
  materials: string[];
  toolIds: string[];
  keyMessage: string;
  tasks: string;
  pictureUris?: string[];
  videoUris?: string[];
  estimatedTime: number;

  constructor(step: StepTemplate) {
    Object.assign(this, step);
  }
}
