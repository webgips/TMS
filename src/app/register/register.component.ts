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
  submitted = false;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  submit() {
    this.submitted = true;

    console.log(this.registerForm);
    if (this.registerForm.invalid) {
        return;
    }
    this.authenticationService.register(this.registerForm.value).subscribe(
    data => {
      this.router.navigate(['/login']);
    },
    error => {
      console.log('error registration', error);
    });
  }
  get inpt() { return this.registerForm.controls; }
}
