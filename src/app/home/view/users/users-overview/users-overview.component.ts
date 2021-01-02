import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/users/users.service';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { UserRowNode } from 'src/app/models/ui/userRowNode';
import { UsersOverviewService } from '../users-overview.service';
import List from "list.js";
import swal from 'sweetalert2';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {
  entries: number = 10;
  searchValue:string= ""
  breadCrumbs: BreadCrumbInfo[]=[{name:"Users Overview", url: this.router.url },];
  userRows: UserRowNode[]=[];
  temp: UserRowNode[]=[]
  options = {
    valueNames: [ 'user-name', 'name' ]
  };
  list
  showArray=[]
  @ViewChild('myTable') table: any;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private usersOverviewService: UsersOverviewService ,

  ) { }

  ngOnInit(): void {
    this.refresh()
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.list = new List('user-list', this.options);
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event){
    let searchValue = this.searchValue
    this.showArray = this.userRows.filter((u)=>{
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
    console.log(this.showArray)
    for (let index = 0; index < this.userRows.length; index++) {
      let element = this.userRows[index];
      let row = document.getElementById(element.id)
      if (this.showArray.includes(element.id)) {
        row.hidden=false
      }else{
        row.hidden=true
      }
      
    }
  }
  refresh() {
    this.userRows = this.usersOverviewService.getRows();
    this.temp = this.userRows.map((prop, key) => {
      
      return {
        ...prop,
        
      }; 
    
    
    
  });
  console.log(this.temp)
  }
  editUser(i){
    this.router.navigate(['users/'+i])
  }
  removeUser(id: string) {
    let a = document.getElementById(id)
    a.remove()
    //this.usersService.deleteUser(id);
    this.refresh();
    
  }
  deleteModal(id:string){

    swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: 'Yes, delete!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
        let a = document.getElementById(id)
        
          this.removeUser(id)
          // Show confirmation
          //this.deleteDraft()
      }
    })
  }
  
  

}
