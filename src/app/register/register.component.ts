import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
      });
  }
  submit() {
    console.log('send register');
    this.authenticationService.register(this.registerForm.value);
  }

}
