export interface OrderDraft {
  id?: string;

  name?: string;
  description?: string;

  products?: {
    templateId?: string;
    templateDraft?: ProductTemplateDraft;
    quantity: number;
  }[];
}

export interface ProductTemplateDraft {
  templateId?: string;
  name?: string;

  processTemplates?: {
    id?: string;
    draft?: ProcessTemplateDraft;
  }[];
}

export interface ProcessTemplateDraft  {
  id?: string;

  name?: string;
  mainTasks?: string[];
  previousComments?: string;
  estimatedTime?: number;

  stepTemplates?: {
    title?: string;
    materials?: string[];
    toolIds?: string[];
    keyMessage?: string;
    tasks?: string;
    pictureUris?: string[];
    videoUris?: string[];
  }[];
}
