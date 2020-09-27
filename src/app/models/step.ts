import { Tool } from './tool';
export interface Step {

  title: string;
  materials: string[];
  toolIds: string[];
  keyMessage: string;
  tasks: string;
  pictureUris?: string[];
  videoUris?: string[];

  timeTaken?: number;
}
