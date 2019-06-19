import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService ]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
      });
  }
  submit() {
    console.log('submit');
    this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password);
    // this.authenticationService.test()
  }

}
