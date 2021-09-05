import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProcessTemplateNode } from 'src/app/models/ui/processTemplateNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessTemplateLibraryService {

  constructor(private processTemplatesService: ProcessTemplatesService) { }

  getAll() {
    return this.processTemplatesService.getAll().pipe(map((templates) => {
      return templates.map((template): ProcessTemplateNode => {
        return {
          id: template.id,
          name: template.name,
          quantity: 1,
          description: 'Not implemented yet',
          stepNames: template.steps.map(step => step.title),
          createdAt: template.createdAt,
          createdBy: template.createdBy?.displayName,
          editedAt: template.editedAt,
          editedBy: template.editedBy?.displayName,
          selected: false
        };
      });
    }));
  }
}
