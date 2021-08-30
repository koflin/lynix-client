import { ProcessTemplate } from 'src/app/models/processTemplate';

import { EditStepTemplateDto } from '../stepTemplate/editStepTemplateDto';

export class EditProcessTemplateDto {
  name: string;
  mainTasks: string[];
  previousComments?: string[];

  stepTemplates: EditStepTemplateDto[];

  constructor(process: ProcessTemplate) {
    Object.assign(this, process);

    this.stepTemplates = process.steps.map((template) => {
      return new EditStepTemplateDto(template);
    });
  }
}
