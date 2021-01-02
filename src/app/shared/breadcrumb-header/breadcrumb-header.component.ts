import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb-header',
  templateUrl: './breadcrumb-header.component.html',
  styleUrls: ['./breadcrumb-header.component.scss']
})
export class BreadcrumbHeaderComponent implements OnInit {

  @Input() breadCrumbs: BreadCrumbInfo[]= []

  constructor() { }

  ngOnInit(): void {
  }
 


}
