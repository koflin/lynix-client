import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/core/users/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() title: string;
  @Input() return: string;

  user: User;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService){
  }

  ngOnInit(): void {
    this.authService.onLocalUserChange.subscribe(localUser => {
      if (localUser) {
        this.usersService.getById(localUser.id).subscribe(user => {
          this.user = user;
        });
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
