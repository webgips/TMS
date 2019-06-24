import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email ]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authenticationService.register(this.registerForm.value)
    .then(
      val => {
        this.router.navigate(['/login']);
        this.notificationService.message('Registration successful');
        // this.authenticationService.updateUserData(this.authenticationService.currentUserSubject)
      },
      error => {
        console.log(error)
        this.notificationService.error(error.message);
      });
  }
  get inpt() { return this.registerForm.controls; }
}
