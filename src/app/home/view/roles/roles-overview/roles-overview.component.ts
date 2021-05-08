import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/roles/roles.service';
import { Role } from 'src/app/models/role';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { UserRowNode } from 'src/app/models/ui/userRowNode';

@Component({
  selector: 'app-roles-overview',
  templateUrl: './roles-overview.component.html',
  styleUrls: ['./roles-overview.component.scss']
})
export class RolesOverviewComponent implements OnInit {

  entries: number = 10;
  searchValue:string= ""
  breadCrumbs: BreadCrumbInfo[]=[{name: $localize `Roles`, url: this.router.url },];
  roleRows: Role[];
  options = {
    valueNames: [ 'name' ]
  };
  list;
  showArray: string[]=[]
  @ViewChild('myTable') table: any;

  constructor(
    private router: Router,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.list = new List('user-list', this.options);
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable(){
    let searchValue = this.searchValue.toLowerCase();

    this.showArray = this.roleRows.filter((u)=>{
      if (!searchValue || searchValue === "") {
        return true;
      }

      for (let key in u) {
        if (typeof u[key]=== 'string' && key != 'avatar') {
          if (u[key].toLowerCase().indexOf(searchValue) !== -1) {
            return true;
          }
        }

      }
      return false;
    }).map((u)=>{
      return u.id
    })
    for (let index = 0; index < this.roleRows.length; index++) {
      let element = this.roleRows[index];
      let row = document.getElementById(element.id)
      if (this.showArray.includes(element.id)) {
        row.hidden=false
      }else{
        row.hidden=true
      }

    }
  }
  refresh() {
    this.rolesService.getAll().subscribe(rows => {
      this.roleRows = [...rows];
    });
  }

  public trackRow(index: number, item: UserRowNode) {
    return item.id;
  }

}
