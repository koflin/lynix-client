import { ProcessTemplateLibraryService } from './process-template-library.service';
import { ProcessTemplateNode } from '../../../../models/ui/processTemplateNode';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-template-library',
  templateUrl: './process-template-library.component.html',
  styleUrls: ['./process-template-library.component.scss']
})
export class ProcessTemplateLibraryComponent implements OnInit {

  templates: ProcessTemplateNode[];

  constructor(private processTemplateLibraryService: ProcessTemplateLibraryService) { }

  ngOnInit(): void {
    this.templates = this.processTemplateLibraryService.getAll();
  }

  onSelect(id: string) {
    this.templates.forEach((template) => {
      if (template.id === id) {
        template.selected = !template.selected;
      }
    });
  }
}
