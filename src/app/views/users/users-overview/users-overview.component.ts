import { UserDraftComponent } from './../../../components/user-draft/user-draft.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRowNode } from './../../../models/ui/userRowNode';
import { UsersOverviewService } from './users-overview.service';
import { UsersService } from './../../../core/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  searchQuery: string;

  userRows: UserRowNode[];
  dataSource: MatTableDataSource<UserRowNode>;
  displayedColumns: string[] = ['id', 'name', 'role'];

  constructor(
    private usersService: UsersService,
    private usersOverviewService: UsersOverviewService,
    public dialog: MatDialog
    ) {
    this.userRows = usersOverviewService.getRows();
    this.dataSource = new MatTableDataSource(this.userRows);
  }

  ngOnInit(): void {
  }

  applyFilter() {
    this.dataSource.filter = this.searchQuery;
  }

  addUser() {
    let dialogRef = this.dialog.open(UserDraftComponent, {
      height: '330px',
      width: '600px',
      data: {
        userDraft: {
          companyId: this.usersService.getCurrentUser().companyId,
        } as User
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      //
    });
  }
}
