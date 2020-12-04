import { read } from 'fs';
import { Route } from '@angular/compiler/src/core';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersDetailService } from './users-detail.service';
import { UserDetailNode } from './../../../models/ui/userDetailNode';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/core/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  userId: string;
  userDetail: UserDetailNode;
  editedUserDetail: UserDetailNode;

  availableRoles: Role[];
  isEditing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersDetailService: UsersDetailService,
    private rolesService: RolesService,
    private usersService: UsersService,
    ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      this.usersDetailService.getDetail(this.userId).subscribe(detail => {
        this.userDetail = detail;
        this.editedUserDetail = {...this.userDetail};
      });
    });

    this.availableRoles = this.rolesService.getAll();

    this.usersDetailService.onDetailChange.subscribe(id => {
      if (id === this.userId && !this.isEditing) {
        this.usersDetailService.getDetail(id).subscribe(detail => {
          this.userDetail = detail;
          this.editedUserDetail = {...this.userDetail};
        });
      }
    });
  }

  switchToEdit() {
    this.isEditing = true;
  }

  cancleEdit() {
    this.isEditing = false;
  }

  save() {
    this.isEditing = false;
    this.usersDetailService.updateDetail(this.editedUserDetail);
  }

  uploadAvatar(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.editedUserDetail.avatar = reader.result.toString();
    };
  }

  clearAvatar() {
    this.editedUserDetail.avatar = this.userDetail.avatar;
  }
}
