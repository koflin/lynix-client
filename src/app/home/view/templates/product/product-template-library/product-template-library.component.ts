import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/role';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ProductTemplateNode } from 'src/app/models/ui/productTemplateNode';

import { ProductTemplatesService } from './../../../../../core/productTemplates/product-tempaltes.service';
import { ProductTemplateLibraryService } from './product-template-library.service';

@Component({
  selector: 'app-product-template-library',
  templateUrl: './product-template-library.component.html',
  styleUrls: ['./product-template-library.component.scss']
})
export class ProductTemplateLibraryComponent implements OnInit {
  templates: ProductTemplateNode[];
  windowWidth:number
  @ViewChild('myTable') table: any;
  breadCrumbs: BreadCrumbInfo[]=[{name:"Template Product Overview", url: this.router.url },];

  permissions = Permission;

  searchValue:string=""

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }
  constructor(private router: Router,
    private productTemplateLibraryService: ProductTemplateLibraryService,
    private productTemplateService: ProductTemplatesService) { }

  ngOnInit(): void {
    this.productTemplateLibraryService.getAll().subscribe(templates => this.templates = templates);
    this.windowWidth = window.innerWidth
  }

  onSelect(id: string) {
    this.templates.forEach((template) => {
      if (template.id === id) {
        template.selected = !template.selected;
      }
    });
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

  edit(id: string) {
    this.router.navigate(['templates/product/' + id]);
  }

  delet(id: string) {
    this.productTemplateService.delete(id);
    this.templates.splice(this.templates.findIndex(t => t.id === id), 1);
  }
}
