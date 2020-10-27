import { Router } from '@angular/router';
import { UserDraftComponent } from './../../../components/user-draft/user-draft.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRowNode } from './../../../models/ui/userRowNode';
import { UsersOverviewService } from './users-overview.service';
import { UsersService } from './../../../core/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../../../models/user';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  searchQuery: string;

  userRows: UserRowNode[];
  dataSource: MatTableDataSource<UserRowNode>;
  displayedColumns: string[] = ['id', 'username', 'name', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private usersOverviewService: UsersOverviewService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.refresh();
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
      if (result) {
        this.usersService.createUser(result);
        this.refresh();
      }
    });
  }

  removeUser(id: string) {
    this.usersService.deleteUser(id);
    this.refresh();
  }

  editUser(id: string) {
    this.router.navigate(['users/' + id]);
  }

  refresh() {
    this.userRows = this.usersOverviewService.getRows();
    this.dataSource = new MatTableDataSource(this.userRows);
  }
}
