import { StepTemplate } from './stepTemplate';

export interface Step extends StepTemplate {

  /*title: string;
  materials: string[];
  toolIds: string[];
  keyMessage: TextArea;
  tasks: TextArea;
  pictureUris?: string[];
  videoUris?: string[];
  estimatedTime: number;*/

  timeTaken?: number;
}
