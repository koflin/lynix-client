import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).then((success) => {
      if (success) {
        this.router.navigate(['home']);
      } else {
        alert("The username or password is wrong!");
      }
    });
  }
}
