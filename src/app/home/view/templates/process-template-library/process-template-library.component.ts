import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChild('myTable') table: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }
  constructor(private router: Router,
    private processTemplateLibraryService: ProcessTemplateLibraryService ) { }

  ngOnInit(): void {
    this.processTemplateLibraryService.getAll().subscribe(templates => this.templates = templates);
    this.windowWidth = window.innerWidth
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
