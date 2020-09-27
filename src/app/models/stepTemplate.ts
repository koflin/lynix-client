import { Tool } from './tool';

export interface StepTemplate {
  title: string;
  materials: string[];
  toolIds: string[];
  keyMessage: string;
  tasks: string;
  pictureUris?: string[];
  videoUris?: string[];
}
