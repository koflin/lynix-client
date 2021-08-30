import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/role';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ProcessTemplateNode } from 'src/app/models/ui/processTemplateNode';

import {
  ProcessTemplateLibraryService,
} from '../../templates/process/process-template-library/process-template-library.service';

@Component({
  selector: 'app-manuals-overview',
  templateUrl: './manuals-overview.component.html',
  styleUrls: ['./manuals-overview.component.scss']
})
export class ManualsOverviewComponent implements OnInit {

  breadCrumbs: BreadCrumbInfo[]=[{name: $localize `Process Manuals`, url: this.router.url },];
  templates: ProcessTemplateNode[];
  windowWidth:number

  permissions = Permission;

  searchValue:string=""

  @ViewChild('myTable') table: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }

  constructor(
    private router: Router,
    private processTemplateLibraryService: ProcessTemplateLibraryService
  ) { }

  ngOnInit(): void {
    this.processTemplateLibraryService.getAll().subscribe(templates => this.templates = templates);
    this.windowWidth = window.innerWidth
  }

  openManual(id: string) {
    this.router.navigate(['manuals/' + id]);
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
