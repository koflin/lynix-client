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
          description: 'Not implemented yet',
          selected: false
        };
      });
    }));
  }
}
