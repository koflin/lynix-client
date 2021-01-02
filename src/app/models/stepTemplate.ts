import { TextArea } from '../shared/models/InputOutputValue';
import { Tool } from './tool';

export interface StepTemplate {
  title: string;
  materials: string[];
  toolIds: string[];
  keyMessage: TextArea;
  tasks: TextArea;
  pictureUris?: string[];
  videoUris?: string[];
  estimatedTime: number;
}
