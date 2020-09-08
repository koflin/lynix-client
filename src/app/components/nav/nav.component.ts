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

  user: User;

  constructor(private usersService: UsersService){
  }

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }

}
