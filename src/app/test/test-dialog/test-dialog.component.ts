import { UsersService } from './../../core/users/users.service';
import { UserDraftComponent } from './../../components/user-draft/user-draft.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.dialog.openDialogs.length === 0) {
      let dialogRef = this.dialog.open(UserDraftComponent, {
        height: '330px',
        width: '600px',
        data: {
          userDraft: {
            companyId: this.authService.getCurrentUser().companyId
          } as User
        }
      });
    }
  }
}
