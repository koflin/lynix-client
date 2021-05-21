import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivationService } from 'src/app/core/activation/activation.service';
import { Activation } from 'src/app/models/activation';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  focus;
  focus1;

  password: string;
  passwordCheck: string;

  showPassword=false
  error: string;

  activationId: string;
  code: string;

  activation: Activation;

  constructor(
    private activationService: ActivationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.activationId = params.get('id');
      this.changeActivation();
    });

    this.route.queryParamMap.subscribe((query) => {
      this.code = query.get('code');
      this.changeActivation();
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if (event.key != undefined) {
      if (event.key== "Enter") {
        this.activate()
      }
    }
  }

  changeActivation() {
    if (!this.activationId || !this.code) {
      this.activation = null;
      return;
    }

    this.activationService.verify(this.activationId, this.code).toPromise().then((activation) => {
      this.activation = activation;
    });
  }

  activate() {
    if (!this.password || this.password.length < 8) {
      this.error = 'Minimum password length is 8 characters';
    } else if (this.password != this.passwordCheck) {
      this.error = 'The two passwords must be equal';
    } else {
      this.activationService.activate(this.activationId, this.code, this.password).subscribe((result) => {
        if (result === true) {
          this.router.navigate(['login']);
        } else {
          this.error = 'Something went wrong';
        }
      });
    }
  }
}
