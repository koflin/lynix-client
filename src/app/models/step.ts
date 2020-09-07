export interface Step {
  title: string;
  materials: string[];
  tools: string[];
  keyMessage: string;
  tasks: string;
  pictureUris?: string[];
  videoUris?: string[];
  timeTaken?: number;
}
