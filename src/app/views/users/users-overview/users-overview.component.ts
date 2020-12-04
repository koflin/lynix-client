import { CompaniesService } from './../../../core/companies/companies.service';
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
import { AuthService } from 'src/app/auth/auth.service';

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
    private authService: AuthService,
    private companiesService: CompaniesService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.usersOverviewService.onUsersChange.subscribe(id => {
      this.usersOverviewService.getRows().subscribe(rows => {
        this.userRows = rows;
        this.dataSource = new MatTableDataSource(this.userRows);
      });
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchQuery;
  }

  async addUser() {

    let companyId = this.authService.getLocalUser().companyId;
    let dialogRef = this.dialog.open(UserDraftComponent, {
      height: '330px',
      width: '600px',
      data: {
        userDraft: {
          companyId,
        } as User,
        company: await this.companiesService.getById(companyId).toPromise()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.createUser(result);
      }
    });
  }

  removeUser(id: string) {
    this.usersService.deleteUser(id);
  }

  editUser(id: string) {
    this.router.navigate(['users/' + id]);
  }
}
