import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { Permission } from 'src/app/models/role';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ProcessTemplateNode } from 'src/app/models/ui/processTemplateNode';

import { ProcessTemplateLibraryService } from './process-template-library.service';

@Component({
  selector: 'app-process-template-library',
  templateUrl: './process-template-library.component.html',
  styleUrls: ['./process-template-library.component.scss']
})
export class ProcessTemplateLibraryComponent implements OnInit {
  breadCrumbs: BreadCrumbInfo[]=[{name:"Template Process Overview", url: this.router.url },];
  templates: ProcessTemplateNode[];
  windowWidth:number

  permissions = Permission;

  searchValue:string=""

  @ViewChild('myTable') table: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }
  constructor(private router: Router,
    private processTemplateLibraryService: ProcessTemplateLibraryService,
    private processTemplateService: ProcessTemplatesService) { }

  ngOnInit(): void {
    this.processTemplateLibraryService.getAll().subscribe(templates => this.templates = templates);
    this.windowWidth = window.innerWidth
  }

  edit(id: string) {
    this.router.navigate(['templates/process/' + id]);
  }

  delet(id: string) {
    this.processTemplateService.delete(id);
    this.templates.splice(this.templates.findIndex(t => t.id === id), 1);
  }

  onActivate($event){
    if ($event.type=="click") {
      this.toggleExpandRow($event.row)
    }
  }
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  paddingLeftNone(){
    return{
      'pl-0': true,
      }
  }
}
