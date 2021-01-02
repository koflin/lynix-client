import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ProductTemplateNode } from 'src/app/models/ui/productTemplateNode';
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth
  }
  constructor(private router: Router,
    private productTemplateLibraryService: ProductTemplateLibraryService) { }

  ngOnInit(): void {
    this.templates = this.productTemplateLibraryService.getAll();
    console.log(this.templates)
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

}
