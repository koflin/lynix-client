import { UserRowNode } from './../../models/ui/userRowNode';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {

  users: UserRowNode[];
  selectedUserId: string;

  displayedColumns: string[] = ['id', 'username', 'name', 'role'];
  dataSource: MatTableDataSource<UserRowNode>;
  filter: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { options: UserRowNode[] }
    ) {
      this.users = this.data.options;
      this.dataSource = new MatTableDataSource(this.users);
    }

  ngOnInit(): void {
  }

  applyFilter() {
    this.dataSource.filter = this.filter;
  }

  selectUser(id: string) {
    this.selectedUserId = id;
  }
}
