import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //achtung, das ist nicht die standard-verfahrensweise
  focus;
  focus1;
  // bis hierhin nicht standard
  user:string=""
  password:string=""
  remember: boolean = false;

  showPassword=false
  error=false
  constructor(private authService: AuthService, private router: Router ) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if (event.key != undefined) {
      if (event.key== "Enter") {
        this.signIn()
      }
    }
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  signIn(){
    if (this.password && this.user) {
      this.authService.login(this.user, this.password, this.remember).then((result:boolean) => {
          this.error = !result
          if (this.error == false) {
            this.router.navigate(['/'])
          }
      })
    }else{
      this.error = true
    }
  }

}
