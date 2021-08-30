import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Permission } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

import { LocalUser } from './../../models/localUser';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  public isCollapsed = true;
  public closeResult: string;
  public navBar: boolean = false;
  public openSide: boolean = false;
  public subMenu: boolean = false;
  public activeItem: string = 'home';
  localUser: LocalUser;
  user: User;

  version = environment.version;

  permissions = Permission;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService){
  }
  ngOnInit(): void {
    this.authService.onLocalUserChange.subscribe(localUser => {
      if (localUser) {
        this.usersService.getMe().subscribe(user => this.user = user);
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.navBar) {
          this.closeOverlay();
        }
      }
    });
  }


  closeOverlay() {
    history.back();
    this.navBar = false
  }
  closeOverlayNoHistory(){
    this.navBar = false
  }

  openNavigation() {
    history.pushState(null, null, 'navigation');
    this.navBar = true

  }
  logout() {
    this.authService.logout().then(() => this.router.navigate(['login']));
  }

  isActive(item) {
    return this.activeItem === item
  }
  setActive(menuItem) {
    if (this.activeItem === menuItem) {
      this.activeItem = ''
    } else {
      this.activeItem = menuItem
    }
  }

}
