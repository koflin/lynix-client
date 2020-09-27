import { ProcessTemplatesService } from '../../../../core/processTemplates/process-templates.service';
import { ProcessTemplateNode } from '../../../../models/ui/processTemplateNode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessTemplateLibraryService {

  constructor(private processTemplatesService: ProcessTemplatesService) { }

  getAll(): ProcessTemplateNode[] {
    return this.processTemplatesService.getAll().map((template): ProcessTemplateNode => {
      return {
        id: template.id,
        name: template.name,
        description: 'Not implemented yet',
        selected: false
      };
    });
  }


}
